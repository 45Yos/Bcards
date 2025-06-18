import { useState } from "react";
import { Button, FloatingLabel } from "flowbite-react";
import {
  handleFormChange,
  saveUserProfile,
} from "../components/EditUser/HandleChange";

interface User {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  image?: {
    url: string;
    alt?: string;
  };
  address?: {
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: string;
    zip?: string;
  };
  isBusiness: boolean;
}

interface EditProfileProps {
  user: User;
  token: string;
  onCancel: () => void;
  onSave: () => void;
}

const EditProfile = ({ user, token, onCancel }: EditProfileProps) => {
  const [, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      first: user.name.first,
      middle: user.name.middle || "",
      last: user.name.last,
    },
    phone: user.phone,
    image: {
      url: user.image?.url || "",
      alt: user.image?.alt || "",
    },
    address: {
      state: user.address?.state || "",
      country: user.address?.country || "",
      city: user.address?.city || "",
      street: user.address?.street || "",
      houseNumber: user.address?.houseNumber || "",
      zip: user.address?.zip || "",
    },
  });

  const handleSave = () => {
    saveUserProfile(user._id, token, formData, () => setIsEditing(false));
  };

  return (
    <div className="mt-4 space-y-6 text-black">
      <h2 className="text-center text-3xl font-semibold dark:text-white">
        עריכת פרופיל
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FloatingLabel
            variant="filled"
            label="First Name"
            value={formData.name.first}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="name.first"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Middle Name"
            value={formData.name.middle}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="name.middle"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Last Name"
            value={formData.name.last}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="name.last"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="phone"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Image URL"
            value={formData.image.url}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="image.url"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Image Alt Text"
            value={formData.image.alt}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="image.alt"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="State"
            value={
              formData.address.state === "not defined"
                ? "None"
                : formData.address.state || ""
            }
            onChange={(e) => handleFormChange(e, setFormData)}
            name="address.state"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Country"
            value={formData.address?.country || ""}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="address.country"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="City"
            value={formData.address?.city || ""}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="address.city"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Street"
            value={formData.address?.street || ""}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="address.street"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="House Number"
            value={formData.address?.houseNumber || ""}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="address.houseNumber"
          />
        </div>

        <div>
          <FloatingLabel
            variant="filled"
            label="Zip Code"
            value={formData.address?.zip || ""}
            onChange={(e) => handleFormChange(e, setFormData)}
            name="address.zip"
          />
        </div>
      </div>

      <div className="col-span-2 flex justify-center space-x-4">
        <Button onClick={onCancel}>ביטול</Button>
        <Button onClick={handleSave}>שמור שינויים</Button>
      </div>
    </div>
  );
};

export default EditProfile;
