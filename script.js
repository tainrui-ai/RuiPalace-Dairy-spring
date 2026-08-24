// 1. 多语言字典定义（包含最新的 Guide 说明书内容）
const translations = {
    zh: {
        title: "蕊宫 · 灵犀鉴",
        guide_title: "使用指南",
        guide_content: "欢迎使用灵犀鉴。本系统支持纯前端本地存储与文件系统直接绑定。您可以通过顶部菜单切换语言、查阅典籍、管理本地手稿与色彩基因库。",
        settings: "系统设置",
        export_btn: "导出本地备份"
    },
    en: {
        title: "Rui Palace · Lingxi Jian",
        guide_title: "User Guide",
        guide_content: "Welcome to Lingxi Jian. This system supports local-first storage and direct File System Access integration. Use the top menu to switch languages, view documentation, and manage local manuscripts and color gene banks.",
        settings: "Settings",
        export_btn: "Export Backup"
    },
    de: {
        title: "Rui Palace · Lingxi Jian",
        guide_title: "Benutzerhandbuch",
        guide_content: "Willkommen bei Lingxi Jian. Dieses System unterstützt lokale Speicherung und direkte Dateisystem-Integration. Nutzen Sie das Menü, um die Sprache zu wechseln, Dokumentationen zu lesen und lokale Manuskripte zu verwalten.",
        settings: "Einstellungen",
        export_btn: "Backup exportieren"
    }
};


// 2. 语言切换核心函数
function switchLanguage(lang) {
    // 检查字典中是否存在该语言
    if (!translations[lang]) {
        console.warn(`Language "${lang}" not found, fallback to zh.`);
        lang = 'zh';
    }

    // 保存用户选择到本地存储
    localStorage.setItem('preferred_lang', lang);

    // 遍历页面中所有需要国际化的元素
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // 如果是输入框的 placeholder 或普通文本，可按需区分处理
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // 同步更新页面标题
    if (translations[lang]['title']) {
        document.title = translations[lang]['title'];
    }
}

// 3. 页面加载完成后初始化语言
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred_lang') || 'zh';
    const langSelect = document.getElementById('language-selector');
    if (langSelect) {
        langSelect.value = savedLang;
    }
    switchLanguage(savedLang);
});

// 切换抽屉显示与隐藏的控制函数
function toggleGuideDrawer() {
    const drawer = document.getElementById('guideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    if (drawer && overlay) {
        drawer.classList.toggle('open');
        overlay.classList.toggle('active');
    }
}
