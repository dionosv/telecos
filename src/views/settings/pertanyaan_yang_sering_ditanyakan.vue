<template>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6   sm:py-6 lg:px-8">
        <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Pertanyaan yang sering ditanyakan</h2>
          <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
            <Disclosure as="div" v-for="asked in pertanyaan_yang_sering_ditanyakan" :key="asked.question" class="pt-6" v-slot="{ open }">
              <dt>
                <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                  <span class="text-base font-semibold leading-7">{{ asked.question }}</span>
                  <span class="ml-6 flex h-7 items-center"> 
                    <ion-icon name="add-outline" v-if="!open" class="h-6 w-6" aria-hidden="true" />
                    <ion-icon name="remove-outline" v-else class="h-6 w-6" aria-hidden="true" />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" class="mt-2 pr-12">
                <p class="text-base leading-7 text-gray-600">{{ asked.answer }}</p>
              </DisclosurePanel>
            </Disclosure>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  },
  data() {
    return {
      pertanyaan_yang_sering_ditanyakan: [
        {
          question: "Apa itu Telecos?",
          answer: "Telecos adalah website dimana pengguna bisa berkonsultasi dengan tenaga medis terkait dengan permasalahan dan kesehatan kulit pengguna."
        },
        {
          question: "Bagaimana cara menggunakan aplikasi Telecos?",
          answer: "Pengguna wajib mendaftar terlebih dahulu di halaman Akun, setelah itu pengguna bisa memilih konsultasi dengan tenaga medis."
        },
        {
          question: "Bagaimana cara memesan sesi konsultasi di Telecos?",
          answer: "Setelah pengguna memiliki akun, pengguna dapat memilih tenaga ahli yang diinginkan beserta waktu yang diinginkan, setelah itu pengguna bisa melakukan pembayaran. Setelah pembayaran selesai, maka pengguna bisa melakukan konsultasi dengan tenaga medis."
        },
        {
          question: "Bagaimana cara mengisi wallet di Telecos?",
          answer: "Pengguna dapat melakukan transfer ke rekening virtual account atau pengguna bisa melakukan transfer manual ke rekening bank milik Telecos."
        },
        {
          question: "Bagaimana jika pengguna lupa password?",
          answer: "Pengguna bisa melakukan reset password pada halaman akun."
        },
        {
          question: "Saya adalah tenaga medis, bagaimana cara saya untuk mendaftar sebagai ahli di Telecos?",
          answer: "Anda dapat melakukan pendaftaran melalui bagian ahli di dalam halaman akun, isi semua data yang valid terkait dengan Anda."
        }
      ]
    }
  }
}
</script>