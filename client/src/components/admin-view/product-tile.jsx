import {  Edit } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

function AdminProductTile({product , setFormData, setOpenCreateProductDialog, setCurrentEditedId , handleDelete}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
        <div>
            <div className="relative">
                <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg" />
            </div>
            <CardContent>
                <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${product?.salePrice ? 'line-through': ''} text-lg font-semibold text-primary `}>${product?.price}</span>
                    {
                        product?.salePrice > 0 ? <span className="text-lg font-semibold">${product?.salePrice}</span> : null
                    }
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button onClick={() => {
                  setOpenCreateProductDialog(true);
                  setCurrentEditedId(`${product?._id}`);
                  setFormData(product);
                }
                } variant="secondary"><Edit size={25}/></Button>
                <Button onClick={() => {
                  handleDelete(product?._id);
                }
                } variant="secondary"><MdDeleteForever size={25}/></Button>
            </CardFooter>
        </div>
    </Card>
  )
}

export default AdminProductTile