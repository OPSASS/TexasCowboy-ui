import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, FloatButton } from 'antd'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import GlobalStyles from './components/GlobalStyles/globalStyles.tsx'
import { AppProvider } from './contexts/app.context.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <GlobalStyles>
              <ConfigProvider
                button={{ className: 'buttonPrimary' }}
                theme={{
                  token: {
                    colorPrimary: '#4862FF',
                    colorPrimaryActive: '#5f76f5',
                    colorPrimaryBorder: '#4862FF',
                    colorPrimaryHover: '#5f76f5',
                    colorTextPlaceholder: '#939393',
                    colorInfo: '#1EA69A',
                    colorBorder: '#D9D9D9',
                    paddingContentHorizontal: 14,
                    colorLink: 'black',
                    colorLinkActive: '#5f76f5',
                    colorLinkHover: '#5f76f5',
                    borderRadius: 4,
                    borderRadiusLG: 4,
                    borderRadiusOuter: 8,
                    borderRadiusSM: 8,
                    borderRadiusXS: 8,
                    controlOutlineWidth: 1,
                    // colorSplit: '#4862FF',
                    colorBorderSecondary: '#E5E7E8',
                    colorBgLayout: 'white'
                  },
                  components: {
                    Layout: {
                      headerBg: 'white',
                      headerColor: 'white',
                      siderBg: 'white',
                      bodyBg: 'white'
                    },
                    Menu: {
                      collapsedWidth: 280
                    },
                    Table: {
                      headerBg: '#fafafa40'
                    }
                  }
                }}
              >
                {/* <Perloader> */}

                <App />

                <FloatButton.BackTop />
                {/* </Perloader> */}
              </ConfigProvider>
            </GlobalStyles>
          </AppProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
