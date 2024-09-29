import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Currency {
    code: string;
    name: string;
}

interface ExchangeRate {
    baseCurrency: string;
    targetCurrency: string;
    rate: number;
}

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
    currencies: Currency[] = [];
    selectedCurrency: string = 'USD';
    exchangeRates: ExchangeRate[] = []; 

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.fetchCurrencies();
    }

    fetchCurrencies(): void {
        this.http.get<Currency[]>('https://localhost:44360/api/currency/currencies').subscribe(data => {
            this.currencies = data;
        }, error => {
            console.error('Error fetching currencies:', error);
        });
    }
    
    onCurrencyChange(): void {
        this.http.get<ExchangeRate[]>(`https://localhost:44360/api/currency/exchange-rates?currency=${this.selectedCurrency}`).subscribe(data => {
            this.exchangeRates = data;
        }, error => {
            console.error('Error fetching exchange rates:', error);
        });
    }
  
}
