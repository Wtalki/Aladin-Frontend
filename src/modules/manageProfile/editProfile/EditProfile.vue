<template>
    <div class="!bg-primary min-h-screen flex flex-col items-center justify-between appWidth">
        <div class="p-4 w-full max-w-md mb-14">
            <h1 class="text-xl font-bold text-gold mb-4 text-center">{{ $t('Update_Your_Info') }}</h1>
            <form @submit.prevent="updateProfile">
                <div class="relative w-28 mx-auto mb-3">
                    <img alt="Profile picture" class="rounded-full w-28 h-28 object-cover"
                        :src="photoPreview || user?.profile" />
                    <span class="absolute bottom-0 right-0 bg-gray-200 text-xs font-bold px-2 py-1 rounded-full">
                        <label for="photo" class="cursor-pointer">
                            <img src="../../../assets/icons/upload.png" width="20" />
                            <input id="photo" type="file" @change="previewPhoto" class="hidden" />
                        </label>
                    </span>
                </div>

                <div class="mb-3">
                    <label class="block text-gray-100 mb-2">{{ $t('Name') }}</label>
                    <input v-model="form.name"
                        class="w-full px-4 py-3 rounded-full bg-gray-100 text-primary border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :placeholder="$t('Enter_Your_Name')" type="text" />
                </div>

                <div class="mb-3">
                    <label class="block text-gray-100 mb-2">{{ $t('Phone') }}</label>
                    <input v-model="form.phone"
                        class="w-full px-4 py-3 rounded-full text-gray bg-gray-300 border border-gray-300" type="text"
                        disabled />
                </div>

                <button class="w-full py-3 rounded-full bg-gold text-white font-bold" type="submit" :disabled="loading">
                    {{ loading ? $t('Updating') + '...' : $t('Update_Info') }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EventBus from '@/libs/AppEventBus';

export default {
    data() {
        return {
            form: {
                name: '',
                phone: '',
            },
            photo: null,
            photoPreview: null,
            loading: false
        };
    },
    computed: {
        ...mapGetters(['user', 'token']),
    },
    mounted() {
        this.form.name = this.user.name;
        this.form.phone = this.user.phone;
    },
    methods: {
        ...mapActions(["getUser"]),
        previewPhoto(event) {
            const file = event.target.files[0];
            if (file) {
                this.photo = file;
                this.photoPreview = URL.createObjectURL(file);
            }
        },
        async updateProfile() {
            try {
                this.loading = true;
                let formData = new FormData();
                formData.append('name', this.form.name);
                if (this.photo) {
                    formData.append('photo', this.photo);
                }

                await this.$axios.post(`/auth/users/update-profile`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                await this.getUser({ token: this.token });
                EventBus.emit('show-toast', {
                    severity: 'success',
                    summary: '',
                    detail: this.$t('Profile_updated_successfully'),
                    life: 2000
                });
                this.$router.push("/profile");
            } catch (e) {
                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: this.$t('Failed_to_update_profile'),
                    life: 2000
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>