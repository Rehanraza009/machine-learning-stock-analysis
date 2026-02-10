-- Create database for ML Stock Analysis
CREATE DATABASE IF NOT EXISTS ml_stock_analysis;
USE ml_stock_analysis;

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    industry VARCHAR(100),
    market_cap BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Stock prices table
CREATE TABLE IF NOT EXISTS stock_prices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    date DATE NOT NULL,
    open_price DECIMAL(10,2),
    high_price DECIMAL(10,2),
    low_price DECIMAL(10,2),
    close_price DECIMAL(10,2),
    volume BIGINT,
    adjusted_close DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    UNIQUE KEY unique_company_date (company_id, date)
);

-- Financial statements table
CREATE TABLE IF NOT EXISTS financial_statements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    statement_type ENUM('balance_sheet', 'income_statement', 'cash_flow') NOT NULL,
    period_end DATE NOT NULL,
    fiscal_year INT NOT NULL,
    fiscal_quarter INT,
    data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    UNIQUE KEY unique_statement (company_id, statement_type, period_end)
);

-- ML analysis results table
CREATE TABLE IF NOT EXISTS ml_analysis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    analysis_date DATE NOT NULL,
    ml_score INT NOT NULL,
    recommendation ENUM('BUY', 'HOLD', 'SELL') NOT NULL,
    confidence_level INT NOT NULL,
    price_target DECIMAL(10,2),
    risk_level ENUM('Low', 'Medium', 'High') NOT NULL,
    factors JSON,
    insights JSON,
    predictions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Real-time alerts table
CREATE TABLE IF NOT EXISTS real_time_alerts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    severity ENUM('info', 'warning', 'critical') NOT NULL,
    message TEXT NOT NULL,
    trigger_price DECIMAL(10,2),
    trigger_volume BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- User watchlists table
CREATE TABLE IF NOT EXISTS user_watchlists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    UNIQUE KEY unique_user_company (user_id, company_id)
);

-- Create indexes for better performance
CREATE INDEX idx_stock_prices_date ON stock_prices(date);
CREATE INDEX idx_stock_prices_company_date ON stock_prices(company_id, date);
CREATE INDEX idx_financial_statements_company ON financial_statements(company_id);
CREATE INDEX idx_ml_analysis_company_date ON ml_analysis(company_id, analysis_date);
CREATE INDEX idx_alerts_company_active ON real_time_alerts(company_id, is_active);
