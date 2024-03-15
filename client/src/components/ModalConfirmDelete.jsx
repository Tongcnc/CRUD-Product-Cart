/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";

function ModalComfirmDelete({ setIsOpen }) {
  const navigate = useNavigate();
  const params = useParams();
  const { deleteProduct } = useProducts();

  const handleClickDelete = async () => {
    try {
      await deleteProduct(params.productId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-full z-10 backdrop-blur-sm">
      <div className="bg-white shadow-lg px-10 py-6 absolute rounded-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="font-semibold text-lg">
          Do you want to Delete this product?
        </p>
        <div className="flex pt-6 gap-6 justify-center">
          <button
            onClick={handleClickDelete}
            className="Btn-modal text-white bg-red-600 hover:bg-red-700 active:bg-red-500 transition delay-150"
          >
            Yes
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="Btn-modal text-white bg-black hover:bg-slate-700 active:bg-slate-600 transition delay-150"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalComfirmDelete;
