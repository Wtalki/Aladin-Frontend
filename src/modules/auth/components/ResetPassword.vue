<template>
    <div class="p-4 w-full max-w-md mb-14">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Change Password</h1>
        <p class="text-gray-100 mb-6">Don't worry! It occurs. Please enter the Phone Number linked with your account.
        </p>
        <form>
            <div class="mb-3 relative">
                <label class="block text-gray-200 mb-2"> New Password </label>
                <input
                    class="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password" type="password" />
                <button class="absolute right-4 top-2/3 transform -translate-y-1/2">
                    <img src="../../../assets/images/svg/openeye.svg" width="30" alt="" />
                </button>
            </div>
            <div class="mb-3 relative">
                <label class="block text-gray-200 mb-2">New Confirm password </label>
                <input
                    class="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter confirm password" type="password" />
                <button class="absolute right-4 top-2/3 transform -translate-y-1/2">
                    <img src="../../../assets/images/svg/openeye.svg" width="30" alt="" />
                </button>
            </div>
            <button class="w-full py-3 rounded-full bg-gold text-white font-bold" type="submit">Reset Password</button>
        </form>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped></style>
