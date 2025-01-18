import { useState, useEffect } from 'react';
import useUserGroup from '../helper/Authentication/getuserGroup';
import AdminRoutes from './AdminRoutes';
import StaffRoutes from './StaffRoutes';
import VendorRoutes from './VendorRoutes';
import AccountsRoutes from './AccountsRoutes';
import RiderRoutes from './RiderRoutes';
import { Spin } from 'antd'; // Import the Spin component

const UserGroup = () => {
  const [userGroup, setUserGroup] = useState(null);  // Initialize as null
  const { data: group, loading, error } = useUserGroup(); // Get group data, loading, and error states

  // Run side-effect when group changes
  useEffect(() => {
    if (group) {
      setUserGroup(group); // Set user group if available
    }
  }, [group]);

  // Loading and error states
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />  {/* Ant Design spinner in the center */}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;  // Handle any errors and display a message
  }

  // Function to return the correct component based on the user group
  const renderUserGroupComponent = (group) => {
    switch (group) {
      case 'Administrator':
        return <AdminRoutes />;
      case 'Staff':
        return <StaffRoutes />;
      case 'Vendor':
        return <VendorRoutes />;
      case 'Accounts':
        return <AccountsRoutes />;
      case 'Rider':
        return <RiderRoutes />;
      default:
        return <p>Unauthorized or unknown user group.</p>; // Fallback for unknown or unauthorized groups
    }
  };

  return (
    <>
      {/* Conditionally render component based on user group */}
      {userGroup ? renderUserGroupComponent(userGroup) : 'No user group available'}
    </>
  );
};

export default UserGroup;
