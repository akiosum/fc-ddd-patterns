import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendConsoleLogChangedAddressHandler
    implements EventHandlerInterface<CustomerChangedAddressEvent> {

    handle(event: CustomerChangedAddressEvent): void {
        var log = 'Endereço do cliente: ' + event.eventData.id + ', ' + event.eventData.name +
            ' alterado para: ' + JSON.stringify(event.eventData.address);
            
        console.log(log);
    }

}