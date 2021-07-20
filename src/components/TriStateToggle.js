import './toggle.css';

function TriStateToggle() {
  return (
    <div class="tri-state-toggle">
        <button class="tri-state-toggle-button" id="toggle-button1">
            A
        </button>

        <button class="tri-state-toggle-button" id="toggle-button2">
            B
        </button>

        <button class="tri-state-toggle-button" id="toggle-button3">
            C
        </button>
    </div>
  );
}

export default TriStateToggle;
