import { ReactLenis, } from 'lenis/react'
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    sepolia,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

import App from './App';
import store from "./redux/store";
import { Provider } from 'react-redux';

const config = getDefaultConfig({
    appName: 'Managment App',
    projectId: '5bdcf35e6d847856d6e306ef7ade866b',
    chains: [mainnet, sepolia],
});

const queryClient = new QueryClient();

/**
 * This is the main configuration file for the app. It sets up the WagmiProvider, RainbowKitProvider, and QueryClientProvider.
 * For more information on the WagmiProvider, see the Wagmi documentation: https://docs.wagmi.io/
 * For more information on the RainbowKitProvider, see the RainbowKit documentation: https://docs.rainbow.me/
 * For more information on the QueryClientProvider, see the React Query documentation: https://react-query.tanstack.com/
 */

function Configuration() {


    return (
        <ReactLenis root>
            <Provider store={store}>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider
                            initialChain={sepolia}
                            appInfo={{
                                appName: 'MIT ADT University Managment Portal',
                            }}
                            theme={darkTheme({
                                accentColor: "#6c35de",
                                accentColorForeground: 'white',
                                fontStack: "rounded",
                                borderRadius: 'medium',
                                overlayBlur: 'small',
                            })}
                            coolMode
                            modalSize="compact"
                        >
                            <App />
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider >
            </Provider>
        </ReactLenis>
    )
}

export default Configuration