import { configureStore } from '@reduxjs/toolkit';
import role from './slices/role.slice';
import campaigns from './slices/campaigns.slice';
import sections from './slices/sections.slice';
import advisers from './slices/advisers.slice';
import products from './slices/products.slice';
import solds from './slices/solds.slice';
import goals from './slices/goals.slice';
import ugiVisible from './slices/ugiVisible.slice';
import ifCampaign from './slices/ifCampaign.slice';
import ifAdviser from './slices/ifAdviser.slice';
import sectionSelect from './slices/sectionSelect.slice';
import date from './slices/date.slice';
import loged from './slices/loged.slice';

export default configureStore({
  reducer: {
    role,
    campaigns,
    sections,
    advisers,
    products,
    solds,
    goals,
    ugiVisible,
    ifCampaign,
    ifAdviser,
    sectionSelect,
    date,
    loged,
	}
});