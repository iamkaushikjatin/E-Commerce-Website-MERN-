import React, { Fragment, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addPrductsFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/productSlice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "", 
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();
  const { toast } = useToast();

  function onAdd(event) {
    event.preventDefault();

    currentEditedId !== null ?
    dispatch(editProduct({ id : `${currentEditedId}`, formData})).then(
      (data) => {
        if(data?.payload?.success){
          toast({
            title: "Product edited successfully",
            status: "success",
          });
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductDialog(false);
        }else {
          // Handle error case
          toast({
            title: "Error editing product",
            status: "error",
          });
        }
      }
      
    )

    :
    dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
      (action) => {
        const { payload } = action;

        if (payload?.success) {
          // Handle success case
          toast({
            title: "Product added successfully",
            status: "success",
          });
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setImageFile(null);
          setOpenCreateProductDialog(false);
        } else {
          // Handle error case
          toast({
            title: "Error adding product",
            status: "error",
          });
        }
      }
    );
  }

  function handleDelete(id){
    dispatch(deleteProduct(id)).then((data) => {
      if(data?.payload?.success){
        toast({
          title: "Product deleted successfully",
          status: "success",
        });
        dispatch(fetchAllProducts());
      }
    }
    )
  }

  function isFormValid(){
    return Object.keys(formData).map((key)=> formData[key] !== '').every((item)=>item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex w-full justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="inline-flex gap-3 items-center justify-center text-sm font-medium rounded-md"
        >
          <span>Add new product</span>
          <IoMdAdd size={20} />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 my-2">
        {productList && productList.length > 0
          ? productList.map((productItem) => {
              return (
                <AdminProductTile 
                  key={productItem?._id}
                  product={productItem}
                  setCurrentEditedId={setCurrentEditedId}
                  setOpenCreateProductDialog={setOpenCreateProductDialog}
                  setFormData={setFormData}
                  handleDelete={handleDelete}
                />
              );
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId!==null ? "Edit the product": "Add the Product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              formControls={addPrductsFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onAdd}
              buttonText={currentEditedId!==null ? "Save": "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
