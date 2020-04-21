
export type stripeReaders = { serialNumber: string }[];

declare namespace StripeTerminal {

  function initialize({ fetchConnectionToken }: {fetchConnectionToken: any}): Promise<any>;

  const DeviceTypeChipper2X: any;
  const DiscoveryMethodBluetoothProximity: any;

  type useSimulatedReader =  undefined | 0 | 1;

  function discoverReaders(
      DeviceTypeChipper2X: any,
      DiscoveryMethodBluetoothProximity: any,
      useSimulator: useSimulatedReader
  ): Promise<any>;

  // function addDidChangeConnectionStatusListener(callback: ({status}: {status: string}) => void): void;
  // function addDidDisconnectUnexpectedlyFromReaderListener(callback: () => void): void;
  // function addDidBeginWaitingForReaderInputListener(callback: ({text}: {text: string}) => void): void;
  // function addDidRequestReaderInputPromptListener(callback: ({text}: {text: string}) => void): void;

  function addReadersDiscoveredListener(callback: Function): Promise<{}>;

  function connectReader(serialNumber: string): Promise<any>

  function createPayment({ amount, currency}: { amount: number, currency: string}): Promise<any>

}

type ConnectionStatusConnected = string;

type ConnectionManagerStatusConnected = 'connected';
type ConnectionManagerStatusConnecting = 'connecting';
type ConnectionManagerStatusDisconnected = 'disconnected';
type ConnectionManagerStatusScanning = 'scanning';

export function useStripeTerminalState(): {
  connectionStatus: ConnectionManagerStatusConnected | ConnectionManagerStatusConnecting | ConnectionManagerStatusDisconnected | ConnectionManagerStatusScanning,
  connectedReader: {batteryLevel: string, serialNumber: string, deviceSoftwareVersion: string, deviceType: string},
  paymentStatus: string,
  cardInserted: any,
  readerInputOptions: any,
  readerInputPrompt: any,
  clearReaderInputState: () => void;
};

export function useStripeTerminalCreatePayment({
                                                 amount,
                                                 onSuccess,
                                                 onFailure,
                                                 description,
                                                 autoRetry,
                                                 onCapture,
                                               }: {
  amount: number,
  onSuccess: (result: any) => void,
  onFailure: (error: any) => void,
  description?: string,
  autoRetry?: boolean,
  onCapture?: (result: any) => void,
}): {
  connectionStatus: ConnectionManagerStatusConnected | ConnectionManagerStatusConnecting | ConnectionManagerStatusDisconnected | ConnectionManagerStatusScanning,
  connectedReader: {batteryLevel: string, serialNumber: string, deviceSoftwareVersion: string, deviceType: string},
  paymentStatus: string,
  cardInserted: any,
  readerInputOptions: any,
  readerInputPrompt: any,
};

export default StripeTerminal;
