/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";

type StoreTypeDetails = {
  Id: string;
  Name_Ar: string;
  Name_En: string;
  IsActive: boolean;
  Icon_path: string;
};

type ApiResponse = {
  Success: boolean;
  Message: string;
  Data: StoreTypeDetails;
};

type ViewItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemId: number | null;
};

const ViewItemModal = ({ isOpen, onClose, itemId }: ViewItemModalProps) => {
  const [details, setDetails] = useState<StoreTypeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(`http://41.38.56.140/Store.Api/api/StoreTypes/GetStoreTypeById/${itemId}`);

        if (response.data.Success) {
          setDetails(response.data.Data);
        } else {
          setError(response.data.Message || "Failed to fetch store type details");
        }
      } catch (err: any) {
        console.error("Error fetching store type details:", err);
        setError(err.response?.data?.Message || err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && itemId) {
      fetchItemDetails();
    } else {
      setDetails(null);
    }
  }, [isOpen, itemId]);

  if (!isOpen) return null;

  const getImageUrl = (path: string | undefined) => {
    if (!path) return undefined;

    if (path.startsWith("/Icons/")) {
      return `http://41.38.56.140/Store.Api${path}`;
    } else if (!path.includes("/")) {
      return `http://41.38.56.140/Store.Api/Icons/${path}`;
    }
    return path;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">تفاصيل القسم</h3>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-blue border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">{error}</div>
        ) : details ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">رقم القسم</label>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-200">{details.Id}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">الاسم بالعربية</label>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-200">{details.Name_Ar}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">الاسم بالإنجليزية</label>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-200">{details.Name_En}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">الحالة</label>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${details.IsActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{details.IsActive ? "مفعل" : "غير مفعل"}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">مسار الصورة</label>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-200 break-words text-xs">{details.Icon_path || "لا يوجد"}</div>

              {details.Icon_path && (
                <div className="mt-3 flex">
                  <div className="w-32 h-32 relative border rounded-md overflow-hidden">
                    <img
                      src={getImageUrl(details.Icon_path)}
                      alt={`صورة ${details.Name_Ar}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">الصورة غير متوفرة</div>';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">لا توجد بيانات</div>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewItemModal;
