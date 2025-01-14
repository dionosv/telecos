<template>
    <TransitionRoot as="template" :show="modelValue">
      <Dialog class="relative z-10" @close="$emit('update:modelValue', false)">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none" @click="$emit('update:modelValue', false)">
                    <span class="sr-only">Close</span> 
                    <ion-icon name="close" class="h-6 w-6"></ion-icon>
                  </button>
                </div>
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ion-icon name="alert-circle" class="h-6 w-6 text-red-600"></ion-icon>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Selesaikan Sesi Konsultasi</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Apakah Anda yakin ingin menyelesaikan sesi konsultasi ini? Sesi yang telah selesai tidak dapat dibuka kembali.</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row gap-x-3 justify-end">
                  <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto" @click="$emit('update:modelValue', false)">Batal</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="selesaikan_sesi">Selesaikan Sesi</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script>
import { tambah_saldo_selesai_konsultasi_expert } from '@/components/logic/API/saldo/saldo';
import { change_session_id_status } from '@/components/logic/API/session/session';
import { new_transaction_user_konsultasi_selesai } from '@/components/logic/API/transaction/transaction';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue' 

  export default {
    name: 'SelesaikanSesiExpert',
    props: {
      modelValue: {
        type: Boolean,
        required: true
      },
      session_id: {
        type: String,
        default: false
      },
      expert_id: {
        type: String,
        default: false
      },
      amount: {
        type: String,
        default: false
      }
    },
    emits: ['update:modelValue'],
    components: {
      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionChild,
      TransitionRoot, 
    },

    methods: {

        async selesaikan_sesi(){
            this.$emit('update:modelValue', false) 
            console.log(await change_session_id_status(this.session_id, "d"))
            console.log(await new_transaction_user_konsultasi_selesai(this.session_id, this.expert_id, this.amount ))
            console.log(await tambah_saldo_selesai_konsultasi_expert(this.expert_id, this.amount))
            this.$router.push({name: 'riwayat_konsultasi_expert'})
        },


        async transfer_duit(){


            await new_transaction_user_konsultasi_selesai(
                
            this.session_id,
    // receiverType,
    receiverId,
    // senderType, 
    // senderId,
    // transactionType,
    amount 
            );

        }
        
    },


  }
  </script>