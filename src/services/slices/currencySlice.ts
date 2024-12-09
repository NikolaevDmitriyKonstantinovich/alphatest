import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface CurrencyRate {
  id: string;
  currency: string;
  rate: number;
  isLiked: boolean;
}
interface CurrencyState {
  rates: CurrencyRate[];
  loading: boolean;
  error: string | null;
}
const API_KEY = 'a661b159b807876747ac5039fbff75c2'; // env

const initialState: CurrencyState = {
  rates: [],
  loading: false,
  error: null
};
export const fetchCurrencyRates = createAsyncThunk<
  CurrencyRate[],
  { baseCurrency: string; targetCurrencies: string[] },
  { rejectValue: string }
>(
  'currency/fetchCurrencyRates',
  async ({ baseCurrency, targetCurrencies }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('https://data.fixer.io/api/latest', {
        params: {
          access_key: API_KEY,
          base: baseCurrency,
          symbols: targetCurrencies.join(',')
        }
      });

      if (data.success) {
        return Object.entries(data.rates)
          .map(([currency, rate]) => ({
            id: uuidv4(),
            currency,
            rate: Number(rate),
            isLiked: false
          }))
          .slice(0, 10);
      } else {
        return rejectWithValue(
          'Ошибка API: проверьте ключ или лимит запросов.'
        );
      }
    } catch {
      return rejectWithValue('Ошибка при запросе данных.');
    }
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const currency = state.rates.find((item) => item.id === action.payload);
      if (currency) {
        currency.isLiked = !currency.isLiked;
      }
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      state.rates = state.rates.filter((item) => item.id !== action.payload);
    },
    addCurrency: (
      state,
      action: PayloadAction<{ currency: string; rate: number }>
    ) => {
      const { currency, rate } = action.payload;
      console.log('Adding new currency:', { currency, rate });
      state.rates.push({
        id: uuidv4(),
        currency,
        rate,
        isLiked: false
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        console.log('Currency rates fetched:', action.payload);
        state.loading = false;
        state.rates = action.payload;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        console.log('Error fetching currency rates:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});
export const selectCurrencyById = (
  state: { currency: CurrencyState },
  id: string
) => state.currency.rates.find((rate) => rate.id === id);
export const { toggleLike, removeCurrency, addCurrency } =
  currencySlice.actions;

export default currencySlice.reducer;
