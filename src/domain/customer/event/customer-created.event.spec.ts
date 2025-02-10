import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogHandler1 from "./handler/customer-created.event-handler1";
import SendConsoleLogHandler2 from "./handler/customer-created.event-handler2";

describe("Domain events tests", () => {

    it("should register event", () => {
        const nameEvent = 'CustomerCreatedEvent';
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register(nameEvent, new SendConsoleLogHandler1());
        eventDispatcher.register(nameEvent, new SendConsoleLogHandler2());

        expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[nameEvent].length).toBe(2);
    });

    it("should must register custom event name", () => {
        const nameEvent = 'TestEvent';
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register(nameEvent, new SendConsoleLogHandler1());
        eventDispatcher.register(nameEvent, new SendConsoleLogHandler2());

        expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
    });

    it("should unregister event", () => {
        const nameEvent = 'CustomerCreatedEvent';
        const eventDispatcher = new EventDispatcher();
        const sendEventHandler1 = new SendConsoleLogHandler1();
        const sendEventHandler2 = new SendConsoleLogHandler2();

        eventDispatcher.register(nameEvent, sendEventHandler1);
        eventDispatcher.register(nameEvent, sendEventHandler2);
        expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[nameEvent].length).toBe(2);

        eventDispatcher.unregister(nameEvent, sendEventHandler1);
        eventDispatcher.unregister(nameEvent, sendEventHandler2);
        expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[nameEvent].length).toBe(0);
    });

    it("should notify events", () => {
        const nameEvent = 'CustomerCreatedEvent';
        const eventDispatcher = new EventDispatcher();
        const sendEventHandler1 = new SendConsoleLogHandler1();
        const sendEventHandler2 = new SendConsoleLogHandler2();
        const spysendEventHandler1 = jest.spyOn(sendEventHandler1, "handle");
        const spysendEventHandler2 = jest.spyOn(sendEventHandler2, "handle");

        eventDispatcher.register(nameEvent, sendEventHandler1);
        eventDispatcher.register(nameEvent, sendEventHandler2);
        expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[nameEvent].length).toBe(2);

        eventDispatcher.notify(new CustomerCreatedEvent({
            id: 1,
            name: "Akio",
        }));
        expect(spysendEventHandler1).toHaveBeenCalled();
        expect(spysendEventHandler2).toHaveBeenCalled();
    });

    it("should unregister events", () => {
        const nameEvent1 = 'CustomerCreatedEvent';
        const nameEvent2 = 'CustomerCreatedEvent2';
        const eventDispatcher = new EventDispatcher();
        const sendEventHandler1 = new SendConsoleLogHandler1();
        const sendEventHandler2 = new SendConsoleLogHandler2();

        eventDispatcher.register(nameEvent1, sendEventHandler1);
        eventDispatcher.register(nameEvent2, sendEventHandler2);
        expect(eventDispatcher.getEventHandlers[nameEvent1].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[nameEvent2].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[nameEvent1][0]).toMatchObject(sendEventHandler1);
        expect(eventDispatcher.getEventHandlers[nameEvent2][0]).toMatchObject(sendEventHandler2);
        
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers[nameEvent1]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers[nameEvent2]).toBeUndefined();
    });
});