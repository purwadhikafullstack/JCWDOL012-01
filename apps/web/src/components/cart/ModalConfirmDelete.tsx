import React from 'react';

interface ModalConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md">
        <p>Anda yakin ingin menghapus item ini dari keranjang?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-4 rounded-md"
            onClick={onConfirm}
          >
            Ya, Hapus
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
