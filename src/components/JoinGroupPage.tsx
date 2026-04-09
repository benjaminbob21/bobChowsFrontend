import { useJoinGroupOrder } from "@/api/OrderApi";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";

const JoinGroupPage = () => {
    const { user } = useAuth0();
    const { joinGroupOrder, isLoading } = useJoinGroupOrder();

    const onCheckout = async(userFormData: UserFormData) => {

      const checkoutData = {
        deliveryDetails: {
          name: userFormData.name,
          addressLine1: userFormData.addressLine1,
          city: userFormData.city,
          country: userFormData.country,
          email: userFormData.email as string,
          },
        userId: user?.sub
      };

      const data = await joinGroupOrder(checkoutData);
      window.location.href = data.url;

    };


    return (
      <CheckoutButton
        disabled={false}
        onCheckout={onCheckout}
        isLoading={isLoading}
      />
    );
}

export default JoinGroupPage;