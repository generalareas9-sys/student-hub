import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatCardsRow from '../components/dashboard/StatCardsRow';
import ResultSummaryDonut from '../components/dashboard/ResultSummaryDonut';
import SubjectAverageBarChart from '../components/dashboard/SubjectAverageBarChart';
import TopStudentsRanking from '../components/dashboard/TopStudentsRanking';
import ClassPerformanceTable from '../components/dashboard/ClassPerformanceTable';
import PassRateClassDonut from '../components/dashboard/PassRateClassDonut';
import MotivationalCard from '../components/dashboard/MotivationalCard';
import EdTechStudentDashboard from '../components/dashboard/EdTechStudentDashboard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function DashboardPage() {
  const { user } = useAuth();

  // Role logic:
  // If user role is INSTRUCTOR/ADMIN, default to 'instructor' (School Overview).
  // If user role is STUDENT, default to 'student' (EdTech Online Exam Portal).
  const [viewMode, setViewMode] = useState(() => {
    return user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN'
      ? 'instructor'
      : 'student';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [academicYear, setAcademicYear] = useState('2024/2025');
  const [term, setTerm] = useState('2nd Term');
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch overview data from backend
  const fetchOverview = useCallback(async (yearVal, termVal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getDashboardOverview({ year: yearVal, term: termVal });
      if (res && res.data) {
        setOverviewData(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard overview:', err);
      setError(err.message || 'Failed to load overview data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview(academicYear, term);
  }, [academicYear, term, fetchOverview]);

  const handleYearChange = (newYear) => {
    setAcademicYear(newYear);
  };

  const handleTermChange = (newTerm) => {
    setTerm(newTerm);
  };

  // If in Student mode, render EdTech Student Portal
  if (viewMode === 'student') {
    return (
      <EdTechStudentDashboard
        onSwitchToInstructor={() => setViewMode('instructor')}
      />
    );
  }

  // Instructor / School Overview view
  const updatedAt = overviewData?.metadata?.updatedAt || 'May 27, 2025';
  const sourceName = overviewData?.metadata?.source || 'School Academic System';

  return (
    <div className="result-dashboard-app" id="resultDashboardRoot">
      {/* Dark Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="rd-main-content" id="mainContent">
        {/* Header with Title, Dropdowns, Role Switcher & Print Button */}
        <Header
          academicYear={academicYear}
          term={term}
          onYearChange={handleYearChange}
          onTermChange={handleTermChange}
          onMenuClick={() => setSidebarOpen(true)}
          onToggleView={() => setViewMode('student')}
          isInstructorView={true}
        />

        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: '#fef2f2',
              color: '#b91c1c',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Notice: {error} (Displaying cached institutional dataset)</span>
            <button
              onClick={() => fetchOverview(academicYear, term)}
              style={{
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Row 1: 5 Gradient Stat Cards */}
        <StatCardsRow
          statCards={overviewData?.statCards}
          loading={loading}
        />

        {/* Row 2: 3-Column Charts Grid */}
        <div className="rd-row-2-grid">
          {/* Result Summary Donut */}
          <ResultSummaryDonut
            data={overviewData?.resultSummary}
            loading={loading}
          />

          {/* Average Score by Subject Bar Chart */}
          <SubjectAverageBarChart
            data={overviewData?.subjectAverages}
            loading={loading}
          />

          {/* Top Performing Students Ranking List */}
          <TopStudentsRanking
            students={overviewData?.topStudents}
            loading={loading}
          />
        </div>

        {/* Row 3: Class Performance Table & Right Stack */}
        <div className="rd-row-3-grid">
          {/* Class Performance Table */}
          <ClassPerformanceTable
            classes={overviewData?.classOverview}
            loading={loading}
          />

          {/* Right Stack: Pass Rate by Class + Motivational Card */}
          <div className="rd-right-stack">
            <PassRateClassDonut
              data={overviewData?.passRateByClass}
              loading={loading}
            />
            <MotivationalCard />
          </div>
        </div>

        {/* Footer */}
        <footer className="rd-footer" role="contentinfo">
          Data is updated as of {updatedAt} | Source: {sourceName}
        </footer>
      </main>
    </div>
  );
}
