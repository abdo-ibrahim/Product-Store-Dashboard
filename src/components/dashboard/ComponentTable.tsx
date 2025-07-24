import { useState } from "react";
import { Button } from "../ui/button";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditItemModal from "./EditItemModal";
import CreateItemModal from "./CreateItemModal";
import ViewItemModal from "./ViewItemModal";
import { Plus } from "lucide-react";

type Item = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  hasImage: boolean;
  status: string;
};

type dataProps = {
  tableData: Item[];
  onDelete?: (id: number) => void;
  onEdit?: (item: Item, file?: File | null) => void;
  onCreate?: (formData: FormData) => void;
  isLoading?: boolean;
};

const ComponentTable = ({ tableData, onDelete, onEdit, onCreate, isLoading = false }: dataProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [viewItemId, setViewItemId] = useState<number | null>(null);

  const tableHeaders = ["رقم القسم", "القسم بالعربي", "القسم بالانجليزي", "الصورة", "الحالة", "حذف", "تعديل"];

  const handleDeleteClick = (item: Item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (item: Item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem && onDelete) {
      onDelete(selectedItem.id);
    }
    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const saveEdit = (updatedItem: Item, file?: File | null) => {
    if (onEdit) {
      onEdit(updatedItem, file);
    }
    setEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleCreate = (formData: FormData) => {
    if (onCreate) {
      onCreate(formData);
    }
    setCreateModalOpen(false);
  };

  const handleViewClick = (item: Item) => {
    setViewItemId(item.id);
    setViewModalOpen(true);
  };

  const handleRowClick = (item: Item, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" || target.closest("button")) {
      return;
    }

    handleViewClick(item);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
        <Button className="bg-primary-blue hover:bg-blue-700 text-white flex items-center justify-start gap-2 ml-auto" onClick={() => setCreateModalOpen(true)}>
          <Plus className="w-4 h-4" />
          <span className="whitespace-nowrap">إضافة قسم جديد</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} className="px-3 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-medium text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 cursor-pointer" onClick={(e) => handleRowClick(row, e)}>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900">{row.id}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm font-medium text-gray-900">{row.name_ar}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">{row.name_en}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-700">
                    {row.hasImage !== false ? (
                      <img
                        src={row.image}
                        alt={`صورة ${row.name_ar}`}
                        className="w-10 h-10 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerHTML = "لا توجد صورة";
                          }
                        }}
                      />
                    ) : (
                      <span className="text-gray-500">لا توجد صورة</span>
                    )}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${row.status === "مفعل" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{row.status}</span>
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700 text-xs px-2 py-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(row);
                      }}>
                      حذف
                    </Button>
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <Button
                      size="sm"
                      className="bg-primary-purple hover:bg-purple-700 text-white text-xs px-2 py-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(row);
                      }}>
                      تعديل
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedItem?.name_ar || ""} />

      <EditItemModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} onSave={saveEdit} item={selectedItem} isLoading={isLoading} />

      <CreateItemModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} onSave={handleCreate} isLoading={isLoading} />

      <ViewItemModal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} itemId={viewItemId} />
    </>
  );
};

export default ComponentTable;
