import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  searchQuery: string;
  weatherData: any;
}

const initialState: WeatherState = {
  searchQuery: '',
  weatherData: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setWeatherData(state, action: PayloadAction<any>) {
      state.weatherData = action.payload;
    },
  },
});

export const { setSearchQuery, setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
