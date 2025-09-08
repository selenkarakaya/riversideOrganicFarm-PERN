import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, changePassword } from "../features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userInfo, updateStatus, updateError, passwordStatus, passwordError } =
    useSelector((state) => state.user);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Update form state when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setProfileData({
        full_name: userInfo.full_name || "",
        email: userInfo.email || "",
        phone_number: userInfo.phone_number || "",
        address: userInfo.address || "",
      });
    }
  }, [userInfo]);

  // Show toast on profile update success
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Profile updated successfully");
      setShowProfileModal(false);
    }
    if (updateStatus === "failed" && updateError) {
      toast.error(updateError);
    }
  }, [updateStatus, updateError]);

  // Show toast on password change success
  useEffect(() => {
    if (passwordStatus === "succeeded") {
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setShowPasswordModal(false);
    }
    if (passwordStatus === "failed" && passwordError) {
      toast.error(passwordError);
    }
  }, [passwordStatus, passwordError]);

  const onProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const onPasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    dispatch(
      changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
    );
  };

  // Close modal on ESC key
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowProfileModal(false);
        setShowPasswordModal(false);
      }
    },
    [setShowProfileModal, setShowPasswordModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  if (!userInfo) return <p>Please log in to view your profile.</p>;

  return (
    <main className="space-y-10 relative">
      <Toaster position="top-right" />
      {/* Account Section */}
      <section className="flex justify-around p-6 rounded-lg shadow bg-white">
        <div className="mb-6">
          <header className="mb-4">
            <h2 className="text-xl font-semibold text-primary text-center">
              Account settings
            </h2>
          </header>
          <article className="text-md space-y-1 text-center">
            <p>{userInfo.full_name}</p>
            <p>{userInfo.email}</p>
            <p>{userInfo.phone_number || "-"}</p>
            <p>{userInfo.address || "-"}</p>
          </article>
        </div>

        <footer className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => setShowProfileModal(true)}
            className="text-green-800 border-b hover:text-green-900 transition"
          >
            EDIT MY DETAILS
          </button>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-green-800 border-b hover:text-green-900 transition"
          >
            CHANGE PASSWORD
          </button>
        </footer>
      </section>

      {/* Profile Modal */}
      {showProfileModal && (
        <Modal onClose={() => setShowProfileModal(false)}>
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Name"
              name="full_name"
              value={profileData.full_name}
              onChange={onProfileChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={onProfileChange}
            />
            <Input
              label="Phone"
              name="phone_number"
              value={profileData.phone_number}
              onChange={onProfileChange}
            />
            <Input
              label="Address"
              name="address"
              value={profileData.address}
              onChange={onProfileChange}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 border text-green-800 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
              >
                {updateStatus === "loading" ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <Modal onClose={() => setShowPasswordModal(false)}>
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={onPasswordChange}
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={onPasswordChange}
            />
            <Input
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={passwordData.confirmNewPassword}
              onChange={onPasswordChange}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border text-green-800 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
              >
                {passwordStatus === "loading" ? "Changing..." : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
};

// Reusable Modal component
const Modal = ({ children, onClose }) => (
  <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow max-w-xl w-full relative">
      {children}
    </div>
  </section>
);

// Reusable Input component
const Input = ({ label, ...props }) => (
  <label className="block text-sm font-medium">
    {label}
    <input
      {...props}
      className="mt-1 w-full border p-2 rounded focus:ring-green-800 focus:outline-none"
      required
    />
  </label>
);

export default UserInfo;
