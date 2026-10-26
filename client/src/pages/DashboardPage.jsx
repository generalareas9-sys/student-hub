import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import StatCard from '../components/dashboard/StatCard';
import StudyHoursChart from '../components/dashboard/StudyHoursChart';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import AssignmentsTable from '../components/dashboard/AssignmentsTable';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    coursesInProgress: 4,
    coursesCompleted: 8,
    certificatesEarned: 3,
    communitySupport: '98%',
  });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const [statsRes, assignRes] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getAssignments().catch(() => null),
      ]);

      if (statsRes?.success && statsRes.data) {
        setStats(statsRes.data);
      }
      if (assignRes?.success && assignRes.data) {
        setAssignments(assignRes.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AppShell
      showRightPanel={true}
      searchValue={searchTerm}
      onSearch={(val) => setSearchTerm(val)}
    >
      {/* 4 Overview Statistics Cards */}
      <section className="stat-cards" aria-label="Academic overview statistics">
        <StatCard
          label="Courses in Progress"
          value={stats.coursesInProgress}
          icon="book"
          bgClass="peach"
        />
        <StatCard
          label="Courses Completed"
          value={stats.coursesCompleted}
          icon="check"
          bgClass="mint"
        />
        <StatCard
          label="Certificates Earned"
          value={stats.certificatesEarned}
          icon="award"
          bgClass="blue"
        />
        <StatCard
          label="Community Support"
          value={stats.communitySupport}
          icon="users"
          bgClass="lavender"
        />
      </section>

      {/* Middle Row: Study Hours & Performance Charts */}
      <div className="charts-row">
        <StudyHoursChart />
        <PerformanceChart />
      </div>

      {/* Bottom: Assignments Management Table */}
      <AssignmentsTable
        assignments={assignments}
        onStatusUpdate={loadData}
      />
    </AppShell>
  );
}
