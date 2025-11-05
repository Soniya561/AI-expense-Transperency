import fs from 'fs';
import path from 'path';
import babel from '@babel/core';

const files = [
  'Frontend/admindashboard.js',
  'Frontend/aiassistant.js',
  'Frontend/aiinsights.js',
  'Frontend/auditordashboard.js',
  'Frontend/auditortrial.js',
  'Frontend/chatbotpage.js',
  'Frontend/components/figma/imagewithfallback.js',
  'Frontend/components/ui/accordion.js',
  'Frontend/components/ui/alert-dialog.js',
  'Frontend/components/ui/aspect-ratio.js',
  'Frontend/components/ui/avatar.js',
  'Frontend/components/ui/badge.js',
  'Frontend/components/ui/breadcrumb.js',
  'Frontend/components/ui/button.js',
  'Frontend/components/ui/calender.js',
  'Frontend/components/ui/carousel.js',
  'Frontend/components/ui/chart.js',
  'Frontend/components/ui/checkbox.js',
  'Frontend/components/ui/collapsible.js',
  'Frontend/components/ui/command.js',
  'Frontend/components/ui/context-menu.js',
  'Frontend/components/ui/dialog.js',
  'Frontend/components/ui/drawer.js',
  'Frontend/components/ui/dropdown-menu.js',
  'Frontend/components/ui/form.js',
  'Frontend/components/ui/hover-card.js',
  'Frontend/components/ui/input-otp.js',
  'Frontend/components/ui/label.js',
  'Frontend/components/ui/menubar.js',
  'Frontend/components/ui/navigation-menu.js',
  'Frontend/components/ui/pagination.js',
  'Frontend/components/ui/popover.js',
  'Frontend/components/ui/progress.js',
  'Frontend/components/ui/radio-group.js',
  'Frontend/components/ui/resizeable.js',
  'Frontend/components/ui/scroll-area.js',
  'Frontend/components/ui/select.js',
  'Frontend/components/ui/separator.js',
  'Frontend/components/ui/sheet.js',
  'Frontend/components/ui/sidebar.js',
  'Frontend/components/ui/slider.js',
  'Frontend/components/ui/sonner.js',
  'Frontend/components/ui/switch.js',
  'Frontend/components/ui/tabs.js',
  'Frontend/components/ui/toggle-group.js',
  'Frontend/components/ui/toggle.js',
  'Frontend/components/ui/tooltip.js',
  'Frontend/dashboard.js',
  'Frontend/expensecategories.js',
  'Frontend/loginpage.js',
  'Frontend/navbar.js',
  'Frontend/reports.js',
  'Frontend/settings.js',
  'Frontend/sidebar.js',
  'Frontend/src/app.js',
  'Frontend/src/main.js',
  'Frontend/themeprovider.js',
  'Frontend/uploadreceipt.js',
  'Frontend/userdashboard.js',
  'Frontend/usermanagement.js'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf8');
    babel.transform(code, {
      presets: [['@babel/preset-react', { pragma: 'React.createElement', pragmaFrag: 'React.Fragment' }]],
      filename: file
    }, (err, result) => {
      if (err) {
        console.error(`Error transforming ${file}:`, err);
      } else {
        fs.writeFileSync(filePath, result.code);
        console.log(`Converted ${file}`);
      }
    });
  } else {
    console.log(`File not found: ${file}`);
  }
});