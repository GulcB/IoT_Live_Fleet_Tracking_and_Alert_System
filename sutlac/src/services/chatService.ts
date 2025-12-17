import {
    ref,
    push,
    onValue,
    off,
    query,
    orderByChild,
    limitToLast,
    set,
    get,
} from 'firebase/database';
import { database } from './firebase';
import type { Message } from '../types/chat';

const MESSAGES_LIMIT = 100;

export class ChatService {
    static async sendMessage(
        channelId: string,
        text: string,
        sender: string,
        senderName: string
    ): Promise<void> {
        const messagesRef = ref(database, `channels/${channelId}/messages`);
        const newMessageRef = push(messagesRef);

        const message: Omit<Message, 'id'> = {
            text,
            sender,
            senderName,
            timestamp: Date.now(),
            read: false,
        };

        await set(newMessageRef, message);
    }

    static subscribeToChannel(
        channelId: string,
        callback: (messages: Message[]) => void
    ): () => void {
        const messagesRef = ref(database, `channels/${channelId}/messages`);
        const messagesQuery = query(
            messagesRef,
            orderByChild('timestamp'),
            limitToLast(MESSAGES_LIMIT)
        );

        const listener = onValue(messagesQuery, (snapshot) => {
            const messages: Message[] = [];
            snapshot.forEach((childSnapshot) => {
                messages.push({
                    id: childSnapshot.key as string,
                    ...childSnapshot.val(),
                });
            });
            callback(messages);
        });

        return () => {
            off(messagesQuery, 'value', listener);
        };
    }

    static async getMessages(channelId: string): Promise<Message[]> {
        const messagesRef = ref(database, `channels/${channelId}/messages`);
        const messagesQuery = query(
            messagesRef,
            orderByChild('timestamp'),
            limitToLast(MESSAGES_LIMIT)
        );

        const snapshot = await get(messagesQuery);
        const messages: Message[] = [];

        snapshot.forEach((childSnapshot) => {
            messages.push({
                id: childSnapshot.key as string,
                ...childSnapshot.val(),
            });
        });

        return messages;
    }

    static async markAsRead(channelId: string): Promise<void> {
        const messagesRef = ref(database, `channels/${channelId}/messages`);
        const snapshot = await get(messagesRef);

        const updates: Record<string, boolean> = {};
        snapshot.forEach((childSnapshot) => {
            updates[`${childSnapshot.key}/read`] = true;
        });

        if (Object.keys(updates).length > 0) {
            const channelRef = ref(database, `channels/${channelId}/messages`);
            await set(channelRef, updates);
        }
    }

    static getGeneralChannelId(): string {
        return 'general';
    }

    static getPrivateChannelId(vehicleId: string): string {
        return `private_${vehicleId}`;
    }
}

export default ChatService;
