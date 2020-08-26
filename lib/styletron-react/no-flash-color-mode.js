"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.noFlashColorMode = void 0;
// Need to be inlined to prevent dark mode FOUC
const storageKey = "theme";

const noFlashColorMode = ({
  defaultMode,
  respectPrefersColorScheme = true,
}) => {
  return `(function() {
  var defaultMode = '${defaultMode}';
  var respectPrefersColorScheme = ${respectPrefersColorScheme};

  function setDataThemeAttribute(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function getStoredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem('${storageKey}');
    } catch (err) {}
    return theme;
  }

  var storedTheme = getStoredTheme();
  if (storedTheme !== null) {
    setDataThemeAttribute(storedTheme);
  } else {
    if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDataThemeAttribute('dark');
    } else if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setDataThemeAttribute('light');
    } else {
      setDataThemeAttribute(defaultMode === 'dark' ? 'dark' : 'light');
    }
  }
})();`;
};

exports.noFlashColorMode = noFlashColorMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXRyb24tcmVhY3Qvbm8tZmxhc2gtY29sb3ItbW9kZS50c3giXSwibmFtZXMiOlsic3RvcmFnZUtleSIsIm5vRmxhc2hDb2xvck1vZGUiLCJkZWZhdWx0TW9kZSIsInJlc3BlY3RQcmVmZXJzQ29sb3JTY2hlbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsVUFBVSxHQUFHLE9BQW5COztBQUNPLE1BQU1DLGdCQUFnQixHQUFHLENBQUM7QUFDL0JDLEVBQUFBLFdBRCtCO0FBRS9CQyxFQUFBQSx5QkFBeUIsR0FBRztBQUZHLENBQUQsS0FNbEI7QUFDWixTQUFRO3VCQUNhRCxXQUFZO29DQUNDQyx5QkFBMEI7Ozs7Ozs7OztzQ0FTeEJILFVBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BWC9DO0FBbUNELENBMUNNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVDb2RlIH0gZnJvbSBcIi4vdGhlbWUtcHJvdmlkZXJcIjtcblxuLy8gTmVlZCB0byBiZSBpbmxpbmVkIHRvIHByZXZlbnQgZGFyayBtb2RlIEZPVUNcbmNvbnN0IHN0b3JhZ2VLZXkgPSBcInRoZW1lXCI7XG5leHBvcnQgY29uc3Qgbm9GbGFzaENvbG9yTW9kZSA9ICh7XG4gIGRlZmF1bHRNb2RlLFxuICByZXNwZWN0UHJlZmVyc0NvbG9yU2NoZW1lID0gdHJ1ZSxcbn06IHtcbiAgZGVmYXVsdE1vZGU6IFRoZW1lQ29kZTtcbiAgcmVzcGVjdFByZWZlcnNDb2xvclNjaGVtZT86IGJvb2xlYW47XG59KTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAoZnVuY3Rpb24oKSB7XG4gIHZhciBkZWZhdWx0TW9kZSA9ICcke2RlZmF1bHRNb2RlfSc7XG4gIHZhciByZXNwZWN0UHJlZmVyc0NvbG9yU2NoZW1lID0gJHtyZXNwZWN0UHJlZmVyc0NvbG9yU2NoZW1lfTtcblxuICBmdW5jdGlvbiBzZXREYXRhVGhlbWVBdHRyaWJ1dGUodGhlbWUpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdGhlbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3RvcmVkVGhlbWUoKSB7XG4gICAgdmFyIHRoZW1lID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgdGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnJHtzdG9yYWdlS2V5fScpO1xuICAgIH0gY2F0Y2ggKGVycikge31cbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cblxuICB2YXIgc3RvcmVkVGhlbWUgPSBnZXRTdG9yZWRUaGVtZSgpO1xuICBpZiAoc3RvcmVkVGhlbWUgIT09IG51bGwpIHtcbiAgICBzZXREYXRhVGhlbWVBdHRyaWJ1dGUoc3RvcmVkVGhlbWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChcbiAgICAgIHJlc3BlY3RQcmVmZXJzQ29sb3JTY2hlbWUgJiZcbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlc1xuICAgICkge1xuICAgICAgc2V0RGF0YVRoZW1lQXR0cmlidXRlKCdkYXJrJyk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHJlc3BlY3RQcmVmZXJzQ29sb3JTY2hlbWUgJiZcbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXNcbiAgICApIHtcbiAgICAgIHNldERhdGFUaGVtZUF0dHJpYnV0ZSgnbGlnaHQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RGF0YVRoZW1lQXR0cmlidXRlKGRlZmF1bHRNb2RlID09PSAnZGFyaycgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICB9XG4gIH1cbn0pKCk7YDtcbn07XG4iXX0=
