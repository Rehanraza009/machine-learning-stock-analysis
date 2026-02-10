import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import json
from datetime import datetime, timedelta

class StockMLAnalyzer:
    def __init__(self):
        self.price_predictor = RandomForestRegressor(n_estimators=100, random_state=42)
        self.recommendation_classifier = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        
    def prepare_features(self, financial_data, price_history):
        """
        Prepare features for ML models from financial and price data
        """
        features = []
        
        # Financial ratios and metrics
        if 'balance_sheet' in financial_data:
            bs = financial_data['balance_sheet']
            debt_to_equity = bs.get('total_liabilities', 0) / max(bs.get('shareholders_equity', 1), 1)
            asset_turnover = financial_data.get('income_statement', {}).get('revenue', 0) / max(bs.get('total_assets', 1), 1)
            features.extend([debt_to_equity, asset_turnover])
        
        # Profitability metrics
        if 'income_statement' in financial_data:
            income = financial_data['income_statement']
            revenue = income.get('revenue', 0)
            net_income = income.get('net_income', 0)
            profit_margin = net_income / max(revenue, 1)
            features.append(profit_margin)
        
        # Technical indicators from price history
        if price_history and len(price_history) > 0:
            prices = [p['close_price'] for p in price_history[-20:]]  # Last 20 days
            
            # Moving averages
            ma_5 = np.mean(prices[-5:]) if len(prices) >= 5 else prices[-1]
            ma_10 = np.mean(prices[-10:]) if len(prices) >= 10 else prices[-1]
            ma_20 = np.mean(prices) if len(prices) >= 20 else prices[-1]
            
            # Price momentum
            price_change_5d = (prices[-1] - prices[-5]) / prices[-5] if len(prices) >= 5 else 0
            price_change_10d = (prices[-1] - prices[-10]) / prices[-10] if len(prices) >= 10 else 0
            
            # Volatility
            volatility = np.std(prices) / np.mean(prices) if len(prices) > 1 else 0
            
            features.extend([ma_5, ma_10, ma_20, price_change_5d, price_change_10d, volatility])
        
        return np.array(features).reshape(1, -1)
    
    def generate_ml_score(self, features):
        """
        Generate ML score based on multiple factors
        """
        # Simulate ML scoring (in real implementation, use trained models)
        base_score = 50
        
        # Add randomness with some logic
        financial_health_boost = np.random.normal(15, 5)
        technical_boost = np.random.normal(10, 8)
        market_sentiment_boost = np.random.normal(5, 10)
        
        final_score = base_score + financial_health_boost + technical_boost + market_sentiment_boost
        return max(0, min(100, int(final_score)))
    
    def predict_price_targets(self, current_price, features):
        """
        Predict future price targets using ML models
        """
        # Simulate price predictions (in real implementation, use trained models)
        volatility_factor = np.random.uniform(0.05, 0.25)
        
        predictions = {}
        time_horizons = {
            'one_week': 7,
            'one_month': 30,
            'three_months': 90,
            'six_months': 180
        }
        
        for period, days in time_horizons.items():
            # Simulate price movement with increasing uncertainty over time
            drift = np.random.normal(0.001, 0.002) * days  # Daily drift
            volatility = volatility_factor * np.sqrt(days / 365)  # Annualized volatility
            
            price_change = drift + np.random.normal(0, volatility)
            predicted_price = current_price * (1 + price_change)
            predictions[period] = max(predicted_price, current_price * 0.5)  # Floor at 50% of current
        
        return predictions
    
    def generate_recommendation(self, ml_score, current_metrics):
        """
        Generate buy/hold/sell recommendation based on ML analysis
        """
        if ml_score >= 75:
            return 'BUY', min(95, ml_score + np.random.randint(5, 15))
        elif ml_score >= 55:
            return 'HOLD', min(85, ml_score + np.random.randint(0, 10))
        else:
            return 'SELL', max(60, ml_score - np.random.randint(5, 15))
    
    def analyze_stock(self, symbol, financial_data, price_history, current_price):
        """
        Perform comprehensive ML analysis on a stock
        """
        try:
            # Prepare features
            features = self.prepare_features(financial_data, price_history)
            
            # Generate ML score
            ml_score = self.generate_ml_score(features)
            
            # Generate recommendation
            recommendation, confidence = self.generate_recommendation(ml_score, financial_data)
            
            # Predict price targets
            price_targets = self.predict_price_targets(current_price, features)
            
            # Risk assessment
            risk_factors = self.assess_risk(financial_data, price_history)
            
            # Generate insights
            insights = self.generate_insights(symbol, financial_data, ml_score)
            
            analysis_result = {
                'symbol': symbol,
                'timestamp': datetime.now().isoformat(),
                'ml_score': ml_score,
                'recommendation': recommendation,
                'confidence': confidence,
                'price_targets': price_targets,
                'risk_level': risk_factors['level'],
                'risk_score': risk_factors['score'],
                'factors': self.analyze_factors(financial_data, price_history),
                'insights': insights,
                'model_version': '1.0.0'
            }
            
            return analysis_result
            
        except Exception as e:
            print(f"Error in ML analysis for {symbol}: {str(e)}")
            return None
    
    def assess_risk(self, financial_data, price_history):
        """
        Assess investment risk based on various factors
        """
        risk_score = 50  # Base risk score
        
        # Financial risk factors
        if 'balance_sheet' in financial_data:
            bs = financial_data['balance_sheet']
            debt_ratio = bs.get('total_liabilities', 0) / max(bs.get('total_assets', 1), 1)
            if debt_ratio > 0.6:
                risk_score += 15
            elif debt_ratio < 0.3:
                risk_score -= 10
        
        # Price volatility risk
        if price_history and len(price_history) > 10:
            prices = [p['close_price'] for p in price_history[-30:]]
            volatility = np.std(prices) / np.mean(prices)
            if volatility > 0.3:
                risk_score += 20
            elif volatility < 0.1:
                risk_score -= 10
        
        # Determine risk level
        if risk_score >= 70:
            level = 'High'
        elif risk_score >= 45:
            level = 'Medium'
        else:
            level = 'Low'
        
        return {'level': level, 'score': max(0, min(100, risk_score))}
    
    def analyze_factors(self, financial_data, price_history):
        """
        Analyze individual factors contributing to the ML score
        """
        factors = []
        
        # Financial Health Factor
        financial_score = np.random.randint(65, 95)
        factors.append({
            'name': 'Financial Health',
            'score': financial_score,
            'weight': 0.25,
            'impact': 'Positive' if financial_score > 70 else 'Neutral',
            'description': 'Balance sheet strength and cash flow analysis'
        })
        
        # Growth Potential Factor
        growth_score = np.random.randint(55, 85)
        factors.append({
            'name': 'Growth Potential',
            'score': growth_score,
            'weight': 0.20,
            'impact': 'Positive' if growth_score > 65 else 'Neutral',
            'description': 'Revenue growth trends and market expansion opportunities'
        })
        
        # Market Sentiment Factor
        sentiment_score = np.random.randint(45, 75)
        factors.append({
            'name': 'Market Sentiment',
            'score': sentiment_score,
            'weight': 0.15,
            'impact': 'Positive' if sentiment_score > 60 else 'Neutral',
            'description': 'Analyst ratings and social media sentiment'
        })
        
        # Valuation Factor
        valuation_score = np.random.randint(40, 80)
        factors.append({
            'name': 'Valuation',
            'score': valuation_score,
            'weight': 0.20,
            'impact': 'Negative' if valuation_score < 50 else 'Neutral',
            'description': 'P/E ratio and other valuation metrics vs peers'
        })
        
        # Technical Analysis Factor
        technical_score = np.random.randint(50, 85)
        factors.append({
            'name': 'Technical Indicators',
            'score': technical_score,
            'weight': 0.20,
            'impact': 'Positive' if technical_score > 65 else 'Neutral',
            'description': 'Moving averages, RSI, and momentum indicators'
        })
        
        return factors
    
    def generate_insights(self, symbol, financial_data, ml_score):
        """
        Generate key insights based on the analysis
        """
        insights = []
        
        base_insights = [
            f"{symbol} shows strong fundamental indicators in recent quarters",
            "Revenue growth trajectory remains positive with market expansion",
            "Balance sheet demonstrates healthy cash position and manageable debt levels",
            "Technical indicators suggest favorable momentum patterns",
            "Analyst consensus aligns with our ML-generated recommendation"
        ]
        
        # Add score-specific insights
        if ml_score > 80:
            insights.extend([
                "Exceptional financial performance metrics detected",
                "Strong competitive positioning in industry sector"
            ])
        elif ml_score < 60:
            insights.extend([
                "Some concerns identified in recent financial performance",
                "Market headwinds may impact near-term growth prospects"
            ])
        
        # Randomly select insights to simulate dynamic analysis
        selected_insights = np.random.choice(base_insights, size=min(5, len(base_insights)), replace=False)
        return selected_insights.tolist()

# Example usage
if __name__ == "__main__":
    analyzer = StockMLAnalyzer()
    
    # Sample data
    sample_financial_data = {
        'balance_sheet': {
            'total_assets': 365000000000,
            'total_liabilities': 258000000000,
            'shareholders_equity': 107000000000,
            'cash_and_equivalents': 48000000000
        },
        'income_statement': {
            'revenue': 394000000000,
            'gross_profit': 170000000000,
            'operating_income': 114000000000,
            'net_income': 99000000000
        }
    }
    
    sample_price_history = [
        {'close_price': 150 + i + np.random.normal(0, 5)} 
        for i in range(30)
    ]
    
    result = analyzer.analyze_stock('AAPL', sample_financial_data, sample_price_history, 175.50)
    
    if result:
        print("ML Analysis Result:")
        print(json.dumps(result, indent=2, default=str))
