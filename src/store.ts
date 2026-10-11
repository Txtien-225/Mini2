import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Room = {
  id: string; name: string; building: 'A' | 'B' | 'C' | 'V'; floor: string;
  capacity: number; equipment: string[]; color: string; seats: number; occupied: boolean;
};
export type Slot = { id: string; label: string; start: string; end: string };
export type Booking = { id: string; room: Room; date: string; slot: Slot; pass: string; createdAt: number };

export const slots: Slot[] = [
  { id: '0730', label: '07:30 – 09:30', start: '07:30', end: '09:30' },
  { id: '0930', label: '09:30 – 11:30', start: '09:30', end: '11:30' },
  { id: '1300', label: '13:00 – 15:00', start: '13:00', end: '15:00' },
  { id: '1500', label: '15:00 – 17:00', start: '15:00', end: '17:00' },
  { id: '1730', label: '17:30 – 19:30', start: '17:30', end: '19:30' }
];

export const rooms: Room[] = [
  { id: 'a201', name: 'Study Hub A2', building: 'A', floor: 'Tầng 2', capacity: 8, seats: 8, equipment: ['Projector', 'AC'], color: '#4f46e5', occupied: false },
  { id: 'b105', name: 'Computer Lab B1', building: 'B', floor: 'Tầng 1', capacity: 20, seats: 20, equipment: ['High-spec PC', 'AC'], color: '#0d9488', occupied: true },
  { id: 'c304', name: 'Quiet Room C3', building: 'C', floor: 'Tầng 3', capacity: 4, seats: 4, equipment: ['Whiteboard', 'AC'], color: '#f59e0b', occupied: false },
  { id: 'v202', name: 'Creative Room V2', building: 'V', floor: 'Tầng 2', capacity: 12, seats: 12, equipment: ['Projector', 'Whiteboard'], color: '#e11d48', occupied: false },
  { id: 'a305', name: 'Group Room A3', building: 'A', floor: 'Tầng 3', capacity: 6, seats: 6, equipment: ['Whiteboard', 'AC'], color: '#7c3aed', occupied: false },
  { id: 'b204', name: 'Code Room B2', building: 'B', floor: 'Tầng 2', capacity: 10, seats: 10, equipment: ['High-spec PC', 'Projector'], color: '#0284c7', occupied: false }
];

type Store = { user: { name: string; studentId: string } | null; bookings: Booking[]; login: (name: string, id: string) => void; addBooking: (b: Booking) => void; cancelBooking: (id: string) => void };
export const useBookingStore = create<Store>()(persist((set) => ({
  user: { name: 'Xuân Tiến', studentId: '22IT123' }, bookings: [],
  login: (name, studentId) => set({ user: { name, studentId } }),
  addBooking: (booking) => set((s) => ({ bookings: [booking, ...s.bookings] })),
  cancelBooking: (id) => set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) }))
}), { name: 'vku-study-room', storage: createJSONStorage(() => AsyncStorage) }));
