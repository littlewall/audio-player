import DefaultTheme from 'vitepress/theme';
import MyLayout from './LWLayout.vue'
import './custom.css';

export default {
    ...DefaultTheme,
    Layout: MyLayout
};
