import { Routes, Route, Navigate } from 'react-router-dom';
import TimelineView from '../components/timeline/TimelineView';
import JournalView from '../components/journal/JournalView';
import ResourcesView from '../components/resources/ResourcesView';
import ChatView from '../components/chat/ChatView';
import GroupsView from '../components/groups/GroupsView';
import AcademicPlannerView from '../components/planner/AcademicPlannerView';
import SimulationView from '../components/simulation/SimulationView';

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/timeline" replace />} />
      <Route path="timeline" element={<TimelineView />} />
      <Route path="planner" element={<AcademicPlannerView />} />
      <Route path="simulation" element={<SimulationView />} />
      <Route path="journal" element={<JournalView />} />
      <Route path="resources" element={<ResourcesView />} />
      <Route path="chat" element={<ChatView />} />
      <Route path="groups" element={<GroupsView />} />
    </Routes>
  );
};

export default DashboardPage;
