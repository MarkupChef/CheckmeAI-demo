import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  topicSlug: null | string;
  level: null | string;
  modeId: null | string;
  topicName: null | string;
  topicIcon: null | string;
  isInterviewMode: boolean;
  jobTitle: null | string;
  companyName: null | string;
  jobDesc: null | string;
}

const initialState: InitialState = {
  topicSlug: null,
  level: null,
  modeId: null,
  topicName: null,
  topicIcon: null,
  isInterviewMode: false,
  jobTitle: null,
  companyName: null,
  jobDesc: null,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    clearInterviewSlice: () => initialState,
    setTopicSlug(state, action: PayloadAction<{ slug: string }>) {
      state.topicSlug = action.payload.slug;
    },
    setLevel(state, action: PayloadAction<{ level: string }>) {
      state.level = action.payload.level;
    },
    setModeId(state, action: PayloadAction<{ modeId: string | null }>) {
      state.modeId = action.payload.modeId;
    },
    setTopicName(state, action: PayloadAction<{ name: string }>) {
      state.topicName = action.payload.name;
    },
    setTopicIcon(state, action: PayloadAction<{ icon: string }>) {
      state.topicIcon = action.payload.icon;
    },
    setInterviewModeFlag(state, action: PayloadAction<{ interviewModeFlag: boolean }>) {
      state.isInterviewMode = action.payload.interviewModeFlag;
    },
    setJobParam(
      state,
      action: PayloadAction<{ jobTitle: string; companyName: string; jobDesc: string; modeId: string }>
    ) {
      state.jobTitle = action.payload.jobTitle;
      state.companyName = action.payload.companyName;
      state.jobDesc = action.payload.jobDesc;
      state.modeId = action.payload.modeId;
    },
  },
});

export const {
  clearInterviewSlice,
  setTopicSlug,
  setLevel,
  setModeId,
  setTopicName,
  setTopicIcon,
  setInterviewModeFlag,
  setJobParam,
} = interviewSlice.actions;

export default interviewSlice.reducer;
