import { configureStore } from '@reduxjs/toolkit'
import campaigns from './slices/campaigns.slice';
import ugiVisible from './slices/ugiVisible.slice';
import sections from './slices/sections.slice';
import section from './slices/sectionSelect';

export default configureStore({
  reducer: {
    campaigns,
    ugiVisible,
    sections,
    section
	}
});