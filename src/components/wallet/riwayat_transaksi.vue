<template>
  <div class="flow-root">
    <ul role="list" class="mb-8">
      <li v-for="(event, eventIdx) in timeline" :key="event.id">
        <div class="relative pb-8">
          <span v-if="eventIdx !== timeline.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
          <div class="relative flex space-x-3">
            <div>
              <span :class="[event.iconBackground, 'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white']">
                <ion-icon :name="event.icon" class="h-5 w-5 text-white" aria-hidden="true"></ion-icon>
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }} <a :href="event.href" class="font-medium text-gray-900">{{ event.target }}</a>
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="event.datetime">{{ event.date }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue' 

export default defineComponent({
  name: 'RiwayatTransaksi',
  data() {
    return {
      timeline: [
        {
          id: 1,
          content: 'Top Up via',
          target: 'Virtual Account BCA',
          href: '#',
          date: 'Dec 15',
          datetime: '2023-12-15',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 2,
          content: 'Konsultasi dengan',
          target: 'Dr. Sarah Wijaya, Sp.KK',
          href: '#',
          date: 'Dec 13',
          datetime: '2023-12-13',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        },
        {
          id: 3,
          content: 'Top Up via',
          target: 'Virtual Account Mandiri',
          href: '#',
          date: 'Dec 10',
          datetime: '2023-12-10',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 4,
          content: 'Konsultasi dengan',
          target: 'Dr. Jessica Lee, Sp.KK',
          href: '#',
          date: 'Dec 8',
          datetime: '2023-12-08',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        },
        {
          id: 5,
          content: 'Top Up via',
          target: 'Virtual Account BCA',
          href: '#',
          date: 'Dec 5',
          datetime: '2023-12-05',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 6,
          content: 'Konsultasi dengan',
          target: 'Dr. Michael Tanner, Sp.KK',
          href: '#',
          date: 'Dec 3',
          datetime: '2023-12-03',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        },
        {
          id: 7,
          content: 'Top Up via',
          target: 'Virtual Account Mandiri',
          href: '#',
          date: 'Nov 30',
          datetime: '2023-11-30',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 8,
          content: 'Konsultasi dengan',
          target: 'Dr. Amanda Putri, Sp.KK',
          href: '#',
          date: 'Nov 28',
          datetime: '2023-11-28',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        },
        {
          id: 9,
          content: 'Top Up via',
          target: 'Virtual Account BCA',
          href: '#',
          date: 'Nov 25',
          datetime: '2023-11-25',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 10,
          content: 'Konsultasi dengan',
          target: 'Dr. Kevin Susanto, Sp.KK',
          href: '#',
          date: 'Nov 23',
          datetime: '2023-11-23',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        },
        {
          id: 11,
          content: 'Top Up via',
          target: 'Virtual Account Mandiri',
          href: '#',
          date: 'Nov 20',
          datetime: '2023-11-20',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 12,
          content: 'Konsultasi dengan',
          target: 'Dr. Linda Wijaya, Sp.KK',
          href: '#',
          date: 'Nov 18',
          datetime: '2023-11-18',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        },
        {
          id: 13,
          content: 'Top Up via',
          target: 'Virtual Account BCA',
          href: '#',
          date: 'Nov 15',
          datetime: '2023-11-15',
          icon: 'arrow-down-circle',
          iconBackground: 'bg-green-500',
        },
        {
          id: 14,
          content: 'Konsultasi dengan',
          target: 'Dr. David Chen, Sp.KK',
          href: '#',
          date: 'Nov 13',
          datetime: '2023-11-13',
          icon: 'arrow-up-circle',
          iconBackground: 'bg-red-500',
        }
      ]
    }
  }
})
</script>