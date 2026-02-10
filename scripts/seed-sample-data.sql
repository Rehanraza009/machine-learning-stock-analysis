-- Insert sample companies
INSERT INTO companies (symbol, name, sector, industry, market_cap) VALUES
('AAPL', 'Apple Inc.', 'Technology', 'Consumer Electronics', 3000000000000),
('GOOGL', 'Alphabet Inc.', 'Technology', 'Internet Services', 1800000000000),
('MSFT', 'Microsoft Corporation', 'Technology', 'Software', 2800000000000),
('TSLA', 'Tesla Inc.', 'Consumer Cyclical', 'Auto Manufacturers', 800000000000),
('AMZN', 'Amazon.com Inc.', 'Consumer Cyclical', 'Internet Retail', 1500000000000),
('NVDA', 'NVIDIA Corporation', 'Technology', 'Semiconductors', 1200000000000),
('META', 'Meta Platforms Inc.', 'Technology', 'Internet Services', 900000000000),
('NFLX', 'Netflix Inc.', 'Communication Services', 'Entertainment', 200000000000);

-- Insert sample stock prices for the last 30 days
INSERT INTO stock_prices (company_id, date, open_price, high_price, low_price, close_price, volume, adjusted_close)
SELECT 
    c.id,
    DATE_SUB(CURDATE(), INTERVAL seq DAY) as date,
    ROUND(150 + (RAND() * 100), 2) as open_price,
    ROUND(160 + (RAND() * 100), 2) as high_price,
    ROUND(140 + (RAND() * 100), 2) as low_price,
    ROUND(155 + (RAND() * 100), 2) as close_price,
    FLOOR(1000000 + (RAND() * 9000000)) as volume,
    ROUND(155 + (RAND() * 100), 2) as adjusted_close
FROM companies c
CROSS JOIN (
    SELECT 0 as seq UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION
    SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION
    SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION
    SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION
    SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29
) seq_table;

-- Insert sample financial statements
INSERT INTO financial_statements (company_id, statement_type, period_end, fiscal_year, fiscal_quarter, data)
SELECT 
    id,
    'balance_sheet',
    '2024-03-31',
    2024,
    1,
    JSON_OBJECT(
        'total_assets', FLOOR(100000000000 + (RAND() * 400000000000)),
        'total_liabilities', FLOOR(50000000000 + (RAND() * 200000000000)),
        'shareholders_equity', FLOOR(50000000000 + (RAND() * 200000000000)),
        'cash_and_equivalents', FLOOR(10000000000 + (RAND() * 90000000000))
    )
FROM companies;

INSERT INTO financial_statements (company_id, statement_type, period_end, fiscal_year, fiscal_quarter, data)
SELECT 
    id,
    'income_statement',
    '2024-03-31',
    2024,
    1,
    JSON_OBJECT(
        'revenue', FLOOR(50000000000 + (RAND() * 350000000000)),
        'gross_profit', FLOOR(20000000000 + (RAND() * 150000000000)),
        'operating_income', FLOOR(10000000000 + (RAND() * 100000000000)),
        'net_income', FLOOR(5000000000 + (RAND() * 95000000000))
    )
FROM companies;

-- Insert sample ML analysis results
INSERT INTO ml_analysis (company_id, analysis_date, ml_score, recommendation, confidence_level, price_target, risk_level, factors, insights, predictions)
SELECT 
    id,
    CURDATE(),
    FLOOR(60 + (RAND() * 40)) as ml_score,
    CASE 
        WHEN RAND() > 0.6 THEN 'BUY'
        WHEN RAND() > 0.3 THEN 'HOLD'
        ELSE 'SELL'
    END as recommendation,
    FLOOR(70 + (RAND() * 30)) as confidence_level,
    ROUND(150 + (RAND() * 100), 2) as price_target,
    CASE 
        WHEN RAND() > 0.6 THEN 'Low'
        WHEN RAND() > 0.3 THEN 'Medium'
        ELSE 'High'
    END as risk_level,
    JSON_ARRAY(
        JSON_OBJECT('name', 'Financial Health', 'score', FLOOR(70 + (RAND() * 30)), 'impact', 'Positive'),
        JSON_OBJECT('name', 'Growth Potential', 'score', FLOOR(60 + (RAND() * 40)), 'impact', 'Positive'),
        JSON_OBJECT('name', 'Market Sentiment', 'score', FLOOR(50 + (RAND() * 50)), 'impact', 'Neutral')
    ) as factors,
    JSON_ARRAY(
        'Strong quarterly earnings performance',
        'Improved operational efficiency metrics',
        'Positive analyst sentiment and coverage',
        'Market expansion opportunities identified'
    ) as insights,
    JSON_OBJECT(
        'one_week', ROUND(150 + (RAND() * 100), 2),
        'one_month', ROUND(150 + (RAND() * 100), 2),
        'three_months', ROUND(150 + (RAND() * 100), 2),
        'six_months', ROUND(150 + (RAND() * 100), 2)
    ) as predictions
FROM companies;

-- Insert sample real-time alerts
INSERT INTO real_time_alerts (company_id, alert_type, severity, message, trigger_price, trigger_volume)
SELECT 
    id,
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'price_movement'
        WHEN 1 THEN 'volume_spike'
        ELSE 'technical_indicator'
    END as alert_type,
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'info'
        WHEN 1 THEN 'warning'
        ELSE 'critical'
    END as severity,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Price breakout detected above resistance level'
        WHEN 1 THEN 'Unusual trading volume spike observed'
        WHEN 2 THEN 'RSI indicates oversold conditions'
        ELSE 'Moving average crossover signal generated'
    END as message,
    ROUND(150 + (RAND() * 100), 2) as trigger_price,
    FLOOR(1000000 + (RAND() * 9000000)) as trigger_volume
FROM companies
WHERE RAND() > 0.5; -- Only create alerts for some companies
