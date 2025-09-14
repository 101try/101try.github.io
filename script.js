/**
 * 工具函数库
 */

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 格式化手机号
function formatPhoneNumber(phone) {
    const cleaned = phone.toString().replace(/\D/g, '');
    if (cleaned.length !== 11) return phone;
    
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 **** $3');
}

// 安全HTML编码
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 生成随机评分（0-1之间的两位小数）
function generateRandomScore() {
    return Math.round(Math.random() * 100) / 100;
}

// 验证手机号
function isValidPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone.toString().trim());
}

// 验证身份证号
function isValidIdCard(idCard) {
    const str = idCard.toString().trim();
    return /(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(str);
}

// 隐藏身份证中间部分
function maskIdCard(idCard) {
    if (idCard.length <= 8) return idCard;
    return idCard.substring(0, 4) + '********' + idCard.substring(idCard.length - 4);
}

// 显示Toast消息
function showToast(message, type = 'info') {
    // 移除现有的toast
    const existingToast = document.getElementById('custom-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建toast元素
    const toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: toastSlideIn 0.3s ease;
        }
        .toast-info { background-color: #667eea; }
        .toast-success { background-color: #28a745; }
        .toast-warning { background-color: #ffc107; color: #333; }
        .toast-error { background-color: #dc3545; }
        @keyframes toastSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// 加载动画
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'custom-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <style>
            #custom-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('custom-loader');
    if (loader) {
        loader.remove();
    }
}