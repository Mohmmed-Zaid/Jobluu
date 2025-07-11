import React from 'react';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import HomePages from './Pages/HomePages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FindJob from './Pages/FindJob';
import FindTalent from './Pages/FindTalent';
import TalentProfilePage from './Pages/TalentProfilePage';
import UploadJobPage from './Pages/UploadJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';


function App() {
  const theme = createTheme({
    primaryColor:"bright-sun",
    primaryShade:4,
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
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="find-jobs" element={<FindJob/>}/>
          <Route path="find-talent" element={<FindTalent/>} />
          <Route path="upload-job" element={<UploadJobPage />} />
          <Route path="talent-profile" element={<TalentProfilePage/>} />
          <Route path="jobs" element={<JobDescPage />} />
          <Route path="apply-job" element={<ApplyJobPage />} />
          <Route path="company" element={<CompanyPage/>} />
          <Route path="posted-job" element={<PostedJobPage/>} />
          <Route path="job-history" element={<JobHistoryPage/>} />


          <Route path="*" element={<HomePages />} /> {/**we cre this wild card route for mainly 404 or not found page */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
