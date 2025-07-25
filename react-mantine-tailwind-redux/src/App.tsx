// App.tsx
import React from 'react';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store, { persistor } from './Store';
import { Loader, Center } from '@mantine/core';

// Pages
import HomePages from './Pages/HomePages';
import FindJob from './Pages/FindJob';
import FindTalent from './Pages/FindTalent';
import TalentProfilePage from './Pages/TalentProfilePage';
import UploadJobPage from './Pages/UploadJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import SignupPage from './Pages/SignupPage';
import ProfilePage from './Pages/ProfilePage';

// Components
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const theme = createTheme({
    primaryColor: "bright-sun",
    primaryShade: 4,
    colors: {
      'mine-shaft': [
        '#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888',
        '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#2d2d2d'
      ],
      'bright-sun': [
        '#fffbeb', '#fff3c6', '#ffe588', '#ffd149', '#ffbd20',
        '#f99b07', '#dd7302', '#b75006', '#943c0c', '#7a330d', '#461902'
      ],
    },
  });

  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <Center h="100vh">
            <Loader size="lg" />
          </Center>
        } 
        persistor={persistor}
      >
        <MantineProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePages />} />
              <Route path="/home" element={<HomePages />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<SignupPage />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route 
                path="/find-jobs" 
                element={
                  <ProtectedRoute>
                    <FindJob />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/find-talent" 
                element={
                  <ProtectedRoute>
                    <FindTalent />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/upload-job" 
                element={
                  <ProtectedRoute>
                    <UploadJobPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/talent-profile" 
                element={
                  <ProtectedRoute>
                    <TalentProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/jobs" 
                element={
                  <ProtectedRoute>
                    <JobDescPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/apply-job" 
                element={
                  <ProtectedRoute>
                    <ApplyJobPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/company" 
                element={
                  <ProtectedRoute>
                    <CompanyPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/posted-job" 
                element={
                  <ProtectedRoute>
                    <PostedJobPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/job-history" 
                element={
                  <ProtectedRoute>
                    <JobHistoryPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute requireProfile={false}>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route for 404 */}
              <Route path="*" element={<HomePages />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;