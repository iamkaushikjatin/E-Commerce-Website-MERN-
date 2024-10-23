import { MdDeleteForever } from "react-icons/md";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`${selectedId?._id===addressInfo?._id?'border-red-400 border-[4px]':'border-black'} cursor-pointer`}
    >
      <CardContent className= "grid gap-4  p-4">
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Note : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button
          onClick={() => {
            handleEditAddress(addressInfo);
          }}
        >
          <Edit size={25} />
        </Button>
        <Button
          onClick={() => {
            handleDeleteAddress(addressInfo);
          }}
        >
          <MdDeleteForever size={25} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
