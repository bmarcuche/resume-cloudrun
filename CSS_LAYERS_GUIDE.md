# CSS Layers Implementation Guide

## Overview
This project implements CSS Cascade Layers to solve Next.js CSS load order inconsistency issues. CSS layers provide predictable styling hierarchy and prevent style conflicts.

## Layer Hierarchy

Our CSS layers are defined in order of specificity (lowest to highest):

```css
@layer reset, base, components, pages, utilities, overrides;
```

### Layer Definitions

1. **`reset`** - CSS resets and font imports
2. **`base`** - CSS variables, base element styles, typography
3. **`components`** - Reusable component styles (buttons, cards, etc.)
4. **`pages`** - Page-specific styles
5. **`utilities`** - Utility classes and helper styles
6. **`overrides`** - Dark mode and important overrides

## Implementation Details

### Webpack Configuration
The `next.config.js` includes a webpack BannerPlugin that ensures the layer definition is added to all CSS files:

```javascript
new webpack.BannerPlugin({
  banner: '@layer reset, base, components, pages, utilities, overrides;',
  test: /\.s?css$/,
  raw: true,
  entryOnly: false,
})
```

### Global CSS Structure

#### Reset Layer
```css
@layer reset {
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@400;500;600;700&display=swap');
}
```

#### Base Layer
- CSS custom properties (variables)
- Base element styles (body, h1-h6, p, etc.)
- Typography foundations
- Dark mode variable definitions

#### Components Layer
- Button styles (.button-teal, .button-download)
- Card styles (.card-white, .card-secondary)
- Navigation styles (.nav-item)
- Paper container styles (.paper-container)
- Theme toggle styles (.theme-toggle)

#### Pages Layer
- Workflow page specific styles
- Page-specific component variations

#### Utilities Layer
- Color utilities (.text-accent-teal, .bg-primary)
- Layout utilities
- Hover states

#### Overrides Layer
- Dark mode specific overrides
- Important declarations
- Browser-specific fixes

## Benefits

### 1. Predictable Cascade
- Styles apply in defined layer order regardless of source order
- No more CSS specificity wars
- Consistent styling across development and production

### 2. Next.js Compatibility
- Solves CSS load order inconsistency in Next.js
- Works with both development and production builds
- Compatible with CSS modules and Tailwind CSS

### 3. Maintainability
- Clear separation of concerns
- Easy to understand style hierarchy
- Simplified debugging

### 4. Performance
- Reduced CSS conflicts
- Better compression due to organized structure
- Faster style resolution

## Usage Guidelines

### Adding New Styles

#### For Component Styles
```css
@layer components {
  .my-new-component {
    /* styles here */
  }
}
```

#### For Page-Specific Styles
```css
@layer pages {
  .my-page-specific-style {
    /* styles here */
  }
}
```

#### For Utility Classes
```css
@layer utilities {
  .my-utility-class {
    /* styles here */
  }
}
```

#### For Dark Mode Overrides
```css
@layer overrides {
  [data-theme="dark"] .my-component {
    /* dark mode styles here */
  }
}
```

### CSS Modules (if added in future)
If CSS modules are added, wrap all styles in the appropriate layer:

```css
@layer components {
  .myComponent {
    /* styles here */
  }
  
  .myComponent__element {
    /* styles here */
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Styles Not Applying
- Ensure the layer definition is at the top of CSS files
- Check that styles are wrapped in the correct layer
- Verify webpack BannerPlugin is working

#### 2. Specificity Issues
- Use the correct layer for the type of style
- Avoid using `!important` unless in the overrides layer
- Check layer order in the definition

#### 3. Dark Mode Issues
- Dark mode overrides should be in the `overrides` layer
- Use `!important` sparingly and only when necessary
- Test both light and dark modes

### Debugging

#### Check Layer Application
In browser dev tools, you can see which layer styles are applied from:
1. Open dev tools
2. Select element
3. Check "Computed" tab
4. Look for layer information in style rules

#### Verify Layer Order
The layer definition should appear at the top of compiled CSS files. If not, check:
1. Webpack configuration
2. CSS file structure
3. Build process

## Migration Notes

### From Previous CSS Structure
- All existing styles have been organized into appropriate layers
- No breaking changes to existing functionality
- Dark mode styles moved to overrides layer
- Component styles properly categorized

### Future Considerations
- New components should follow layer guidelines
- Consider CSS-in-JS solutions if complexity grows
- Monitor Next.js updates for native layer support

## Performance Impact

### Positive Impacts
- Reduced CSS conflicts and recalculations
- Better browser caching due to organized structure
- Faster style resolution

### Monitoring
- Build size remains similar
- Runtime performance improved
- No negative impact on Core Web Vitals

## Browser Support

CSS Cascade Layers are supported in:
- Chrome 99+
- Firefox 97+
- Safari 15.4+
- Edge 99+

For older browsers, styles will still work but without layer benefits.

---

**Implementation Date**: July 26, 2025  
**Next.js Version**: 15.1.0  
**Status**: Production Ready  
**Maintainer**: Resume CloudRun Project
