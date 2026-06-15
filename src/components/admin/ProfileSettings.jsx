import React, { useState } from "react";
import { UserCog, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import useUserStore from "../../setup/stores/UserStore";
import useUpdateProfileHook from "../../hooks/users/useUpdateProfileHook";
import useChangePasswordHook from "../../hooks/users/useChangePasswordHook";
import toast from "react-hot-toast";

const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-xl">
                <Icon className="w-5 h-5 text-purple-500" />
            </div>
            <div>
                <h2 className="text-base font-semibold text-gray-800">{title}</h2>
                <p className="text-xs text-gray-400">{subtitle}</p>
            </div>
        </div>
        {children}
    </div>
);

const PasswordInput = ({ label, value, onChange, placeholder }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition bg-white/80"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    tabIndex={-1}
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

const ProfileSettings = () => {
    const userData = useUserStore((state) => state.userData);
    const { isLoading: isSavingProfile, handleUpdateProfile } = useUpdateProfileHook();
    const { isLoading: isSavingPassword, handleChangePassword } = useChangePasswordHook();

    const [profile, setProfile] = useState({
        name: userData?.name || "",
        username: userData?.username || "",
        email: userData?.email || "",
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [profileSuccess, setProfileSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUpdateProfile(profile);
            setProfileSuccess(true);
            toast.success("Profile updated!");
            setTimeout(() => setProfileSuccess(false), 3000);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update profile.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        if (passwords.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters.");
            return;
        }
        try {
            await handleChangePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setPasswordSuccess(true);
            toast.success("Password changed successfully!");
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to change password.");
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-semibold text-gray-800">Profile Settings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage your account information and password</p>
            </div>

            {/* Avatar + name display */}
            <div className="flex items-center gap-4 mb-8 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {(userData?.name || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{userData?.name || "—"}</p>
                    <p className="text-sm text-gray-400">{userData?.email || "—"}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium capitalize">
                        {userData?.privilege || "admin"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Info */}
                <SectionCard
                    icon={UserCog}
                    title="Profile Information"
                    subtitle="Update your name, username and email"
                >
                    {profileSuccess && (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            Profile updated successfully!
                        </div>
                    )}
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                placeholder="Your full name"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition bg-white/80"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                            <input
                                type="text"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                placeholder="Your username"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition bg-white/80"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                placeholder="your@email.com"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition bg-white/80"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSavingProfile}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 rounded-xl text-sm transition disabled:opacity-60 mt-2"
                        >
                            {isSavingProfile ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </SectionCard>

                {/* Change Password */}
                <SectionCard
                    icon={Lock}
                    title="Change Password"
                    subtitle="Keep your account secure with a strong password"
                >
                    {passwordSuccess && (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            Password changed successfully!
                        </div>
                    )}
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <PasswordInput
                            label="Current Password"
                            value={passwords.currentPassword}
                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            placeholder="Enter current password"
                        />
                        <PasswordInput
                            label="New Password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            placeholder="At least 6 characters"
                        />
                        <PasswordInput
                            label="Confirm New Password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            placeholder="Repeat new password"
                        />
                        {passwords.newPassword && passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
                            <p className="text-xs text-red-500">Passwords do not match.</p>
                        )}
                        <button
                            type="submit"
                            disabled={isSavingPassword}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 rounded-xl text-sm transition disabled:opacity-60 mt-2"
                        >
                            {isSavingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </SectionCard>
            </div>
        </div>
    );
};

export default ProfileSettings;
