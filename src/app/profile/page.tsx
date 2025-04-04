import OrderHistory from '@/componenets/profile/orderHistory';
import ProfileMode from '@/componenets/profile/profileMode';
import UserData from '@/componenets/profile/UserData';

export default function ProfilePage() {

  return (
    <div className="container mx-auto p-4">
        <ProfileMode>
           <UserData />
          <OrderHistory />
        </ProfileMode>
       
    </div>
  );
}
