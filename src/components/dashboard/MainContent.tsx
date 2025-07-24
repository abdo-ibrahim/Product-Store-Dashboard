/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ComponentTable from "./ComponentTable";
import Pagination from "./Pagination";
import { StoreType, TransformedStoreType, StoreTypesResponse } from "../../types/app";

const transformApiData = (data: StoreType[]) => {
  return data.map((item) => {
    const hasImage = Boolean(item.Icon_path && item.Icon_path.trim() !== "");
    let imageUrl = "";
    if (hasImage) {
      imageUrl = item.Icon_path.startsWith("/Icons/") ? `http://41.38.56.140/Store.Api${item.Icon_path}` : `http://41.38.56.140/Store.Api/Icons/${item.Icon_path}`;
    }

    return {
      id: parseInt(item.Id),
      name_ar: item.Name_Ar,
      name_en: item.Name_En,
      image: imageUrl,
      hasImage,
      status: item.IsActive ? "مفعل" : "غير مفعل",
    };
  });
};

const MainContent = () => {
  const [tableData, setTableData] = useState<TransformedStoreType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStoreTypes = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await axios.get<StoreTypesResponse>(`http://41.38.56.140/Store.Api/api/StoreTypes/GetAllTypes?page=${page}&pageSize=${pageSize}`);

        const data = response.data;
        if (data.Success) {
          setTableData(transformApiData(data.Data));
          setTotalPages(data.Pagination?.TotalPages || 1);
          setCurrentPage(data.Pagination?.CurrentPage || 1);
        } else {
          setError(data.Message || "Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.response?.data?.Message || err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchStoreTypes(currentPage);
  }, [currentPage, fetchStoreTypes]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return tableData;
    }

    const searchLower = searchTerm.toLowerCase();
    return tableData.filter((item) => item.name_ar.toLowerCase().includes(searchLower) || item.name_en.toLowerCase().includes(searchLower));
  }, [tableData, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = async (item: any, file?: File | null) => {
    setIsLoading(true);
    try {
      let iconPath = item.image;
      if (iconPath && iconPath.includes("http://41.38.56.140/Store.Api")) {
        if (iconPath.includes("/Icons/")) {
          iconPath = iconPath.split("/Icons/")[1];
        } else {
          iconPath = iconPath.substring(iconPath.lastIndexOf("/") + 1);
        }
      }

      if (file) {
        iconPath = file.name;
      }
      const payload = {
        Id: item.id.toString(),
        Name_Ar: item.name_ar,
        Name_En: item.name_en,
        IsActive: item.status === "مفعل",
        Icon_path: iconPath,
      };
      console.log("Update payload:", payload);

      const response = await axios.put(`http://41.38.56.140/Store.Api/api/StoreTypes/UpdateStoreType/${item.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.Success) {
        fetchStoreTypes(currentPage);
      } else {
        setError(response.data.Message || "Failed to update item");
      }
    } catch (err: any) {
      console.error("Error updating store type:", err);
      setError(err.response?.data?.Message || err.message || "An error occurred while updating the item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const id = formData.get("Id") as string;
      const nameAr = formData.get("Name_Ar") as string;
      const nameEn = formData.get("Name_En") as string;
      const isActive = formData.get("IsActive") === "true";

      let iconPath = "";
      if (formData.get("Icon")) {
        const file = formData.get("Icon") as File;
        iconPath = file.name;
      }

      const payload = {
        Id: id,
        Name_Ar: nameAr,
        Name_En: nameEn,
        IsActive: isActive,
        Icon_path: iconPath,
      };

      const response = await axios.post(`http://41.38.56.140/Store.Api/api/StoreTypes/CreateStoreType`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Create payload:", payload);
      if (response.data.Success) {
        fetchStoreTypes(currentPage);
      } else {
        setError(response.data.Message || "Failed to create item");
      }
    } catch (err: any) {
      console.error("Error creating store type:", err);
      setError(err.response?.data?.Message || err.message || "An error occurred while creating the item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 p-3 md:p-6 bg-gray-50">
      <div className="mb-6 bg-primary-yellow p-3 md:p-4 rounded-lg shadow-sm border flex flex-col md:flex-row items-center gap-3 md:gap-4 md:justify-between">
        <div className="text-center md:text-right w-full md:w-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">أقسام المتاجر</h1>
          <p className="text-sm md:text-base text-gray-600">قائمة بجميع أنواع المتاجر</p>
        </div>
        <div className="search w-full md:w-auto">
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="بحث..." className="w-full md:w-auto md:min-w-64 p-2 border border-gray-300 rounded-md text-sm" />
          <div className="text-xs mt-1 text-gray-500 md:hidden text-center">البحث بالاسم العربي أو الإنجليزي</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full border-4 border-solid border-primary-blue border-r-transparent h-8 w-8 mr-2"></div>
          <span className="text-gray-600">جاري التحميل...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">{error}</div>
      ) : (
        <>
          <ComponentTable tableData={filteredData} onEdit={handleEdit} onCreate={handleCreate} isLoading={isLoading} />

          {filteredData.length === 0 && searchTerm.trim() !== "" && (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
              <p className="text-gray-600">لا توجد نتائج مطابقة للبحث</p>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  );
};

export default MainContent;
