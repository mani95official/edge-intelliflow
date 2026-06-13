import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  repeat?: boolean;
}

export function Logo({ className, repeat = false, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 1195 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`logo-container ${repeat ? "repeat-animation" : ""} ${className || ""}`}
      {...props}
    >
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-10px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02) translateY(1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounceInRepeat {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-10px);
          }
          4.17% {
            opacity: 0.8;
            transform: scale(1.02) translateY(1px);
          }
          8.33% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          80% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          85% {
            opacity: 0.5;
            transform: scale(0.9) translateY(-2px);
          }
          90%, 100% {
            opacity: 0;
            transform: scale(0.3) translateY(-10px);
          }
        }

        @keyframes drawIn {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes drawInRepeat {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          10% {
            opacity: 1;
            transform: scaleY(1);
          }
          80% {
            opacity: 1;
            transform: scaleY(1);
          }
          90%, 100% {
            opacity: 0;
            transform: scaleY(0);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .logo-container {
          cursor: pointer;
          overflow: visible;
        }

        .logo-container .logo-letter {
          transition: opacity 0.3s, fill 0.3s, transform 0.3s;
          transform-origin: center;
        }

        .logo-container:hover .logo-letter {
          opacity: 0.85;
          transform: translateY(-2px);
        }

        /* Staggered load animations */
        .logo-letter-1 { animation: bounceIn 0.5s ease-out 0.05s both; transform-origin: 75px 100px; }
        .logo-letter-2 { animation: bounceIn 0.5s ease-out 0.10s both; transform-origin: 200px 110px; }
        .logo-letter-3 { animation: bounceIn 0.5s ease-out 0.15s both; transform-origin: 300px 100px; }
        .logo-letter-4 { animation: bounceIn 0.5s ease-out 0.20s both; transform-origin: 400px 110px; }
        .logo-letter-5 { animation: bounceIn 0.5s ease-out 0.25s both; transform-origin: 500px 110px; }
        .logo-letter-6 { animation: bounceIn 0.5s ease-out 0.30s both; transform-origin: 600px 100px; }
        .logo-letter-7 { animation: bounceIn 0.5s ease-out 0.35s both; transform-origin: 700px 100px; }
        .logo-letter-8 { animation: bounceIn 0.5s ease-out 0.40s both; transform-origin: 800px 100px; }
        .logo-letter-9 { animation: bounceIn 0.5s ease-out 0.45s both; transform-origin: 900px 110px; }

        .logo-slash-1 {
          transform-origin: 1010px 100px;
          animation: drawIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s both;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s;
        }

        .logo-slash-2 {
          transform-origin: 1100px 100px;
          animation: drawIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s both;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s;
        }

        .logo-i-stem {
          transform-origin: 1180px 110px;
          animation: bounceIn 0.5s ease-out 0.7s both;
        }

        .logo-i-dot {
          transform-origin: 1182px 11px;
          animation: bounceIn 0.5s ease-out 0.8s both, blink 2s infinite ease-in-out 1.5s;
          transition: fill 0.3s, filter 0.3s, transform 0.3s;
        }

        /* Repeating animation rules */
        .logo-container.repeat-animation .logo-letter-1 { animation: bounceInRepeat 6s ease-out 0.05s infinite; }
        .logo-container.repeat-animation .logo-letter-2 { animation: bounceInRepeat 6s ease-out 0.10s infinite; }
        .logo-container.repeat-animation .logo-letter-3 { animation: bounceInRepeat 6s ease-out 0.15s infinite; }
        .logo-container.repeat-animation .logo-letter-4 { animation: bounceInRepeat 6s ease-out 0.20s infinite; }
        .logo-container.repeat-animation .logo-letter-5 { animation: bounceInRepeat 6s ease-out 0.25s infinite; }
        .logo-container.repeat-animation .logo-letter-6 { animation: bounceInRepeat 6s ease-out 0.30s infinite; }
        .logo-container.repeat-animation .logo-letter-7 { animation: bounceInRepeat 6s ease-out 0.35s infinite; }
        .logo-container.repeat-animation .logo-letter-8 { animation: bounceInRepeat 6s ease-out 0.40s infinite; }
        .logo-container.repeat-animation .logo-letter-9 { animation: bounceInRepeat 6s ease-out 0.45s infinite; }

        .logo-container.repeat-animation .logo-slash-1 { animation: drawInRepeat 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s infinite; }
        .logo-container.repeat-animation .logo-slash-2 { animation: drawInRepeat 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s infinite; }

        .logo-container.repeat-animation .logo-i-stem { animation: bounceInRepeat 6s ease-out 0.7s infinite; }
        .logo-container.repeat-animation .logo-i-dot { animation: bounceInRepeat 6s ease-out 0.8s infinite; }

        /* Hover interactions */
        .logo-container:hover .logo-slash-1 {
          transform: translate(-10px, -6px);
          filter: drop-shadow(0 0 8px rgba(0, 13, 255, 0.8));
        }

        .logo-container:hover .logo-slash-2 {
          transform: translate(10px, 6px);
          filter: drop-shadow(0 0 8px rgba(0, 13, 255, 0.8));
        }

        .logo-container:hover .logo-i-dot {
          fill: #000DFF;
          transform: translateY(-4px) scale(1.2);
          filter: drop-shadow(0 0 6px rgba(0, 13, 255, 0.9));
        }
      `}</style>

      <defs>
        <linearGradient id="slash-grad-1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#000DFF" />
          <stop offset="0%" stopColor="#000DFF">
            <animate attributeName="offset" values="-0.3; 1.0; 1.0" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" stopColor="#99bbff">
            <animate attributeName="offset" values="-0.15; 1.15; 1.15" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" stopColor="#000DFF">
            <animate attributeName="offset" values="0.0; 1.3; 1.3" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#000DFF" />
        </linearGradient>
        <linearGradient id="slash-grad-2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#000DFF" />
          <stop offset="0%" stopColor="#000DFF">
            <animate attributeName="offset" values="-0.3; 1.0; 1.0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" stopColor="#99bbff">
            <animate attributeName="offset" values="-0.15; 1.15; 1.15" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" stopColor="#000DFF">
            <animate attributeName="offset" values="0.0; 1.3; 1.3" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#000DFF" />
        </linearGradient>
      </defs>

      <path className="logo-letter logo-letter-1" d="M60.25 12.5H78.25L20.5 187.5H0L60.25 12.5ZM84 12.5L146.75 187.5H126.25L66 12.5H84ZM23.75 126.75H118V143.25H23.75V126.75Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-2" d="M167.064 143.25C167.898 153.583 172.231 161.667 180.064 167.5C188.064 173.167 197.814 176 209.314 176C220.648 176 229.648 173.75 236.314 169.25C242.981 164.75 246.314 158 246.314 149C246.314 143.833 244.564 139.833 241.064 137C237.731 134.167 233.231 132 227.564 130.5C221.898 129 215.731 127.75 209.064 126.75C202.398 125.75 195.648 124.583 188.814 123.25C182.148 121.75 175.981 119.667 170.314 117C164.648 114.167 160.064 110.333 156.564 105.5C153.231 100.5 151.564 94 151.564 86C151.564 78.5 153.814 71.5 158.314 65C162.814 58.5 169.231 53.3333 177.564 49.5C186.064 45.5 195.981 43.5 207.314 43.5C217.481 43.5 226.648 45.5833 234.814 49.75C243.148 53.75 249.731 59.3333 254.564 66.5C259.564 73.6667 262.064 82 262.064 91.5H246.314C245.648 81.1667 241.481 73.1667 233.814 67.5C226.314 61.8333 217.148 59 206.314 59C194.148 59 184.981 61.5834 178.814 66.75C172.648 71.75 169.564 78.1667 169.564 86C169.564 91.5 171.231 95.75 174.564 98.75C178.064 101.75 182.648 104.083 188.314 105.75C193.981 107.25 200.148 108.5 206.814 109.5C213.648 110.5 220.398 111.75 227.064 113.25C233.731 114.583 239.898 116.583 245.564 119.25C251.231 121.75 255.731 125.417 259.064 130.25C262.564 134.917 264.314 141.167 264.314 149C264.314 157.833 262.064 165.417 257.564 171.75C253.064 178.083 246.648 183 238.314 186.5C229.981 189.833 219.898 191.5 208.064 191.5C197.064 191.5 187.231 189.417 178.564 185.25C169.898 180.917 162.981 175.167 157.814 168C152.814 160.667 150.148 152.417 149.814 143.25H167.064Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-3" d="M268.814 47.5H342.564V63H268.814V47.5ZM294.814 12.5H313.064V154.5C313.064 160.667 314.398 165.167 317.064 168C319.898 170.667 323.898 172 329.064 172H346.564V187.5H328.814C317.481 187.5 308.981 184.333 303.314 178C297.648 171.667 294.814 163.833 294.814 154.5V12.5Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-4" d="M361.861 47.5H380.111V187.5H361.861V47.5ZM380.111 109L376.361 93.25C376.361 88.9167 377.028 83.9167 378.361 78.25C379.695 72.5833 382.195 67.1667 385.861 62C389.695 56.6667 395.111 52.25 402.111 48.75C409.111 45.25 418.195 43.5 429.361 43.5V62.75C419.528 62.75 410.861 64.3333 403.361 67.5C396.028 70.5 390.278 75.4167 386.111 82.25C382.111 88.9167 380.111 97.8333 380.111 109Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-5" d="M499.039 191.5C484.539 191.5 471.956 188.417 461.289 182.25C450.622 175.917 442.289 167.167 436.289 156C430.456 144.833 427.539 132.083 427.539 117.75C427.539 103.25 430.456 90.4167 436.289 79.25C442.289 68.0833 450.622 59.3333 461.289 53C471.956 46.6667 484.539 43.5 499.039 43.5C513.539 43.5 526.122 46.6667 536.789 53C547.456 59.3333 555.706 68.0833 561.539 79.25C567.539 90.4167 570.539 103.25 570.539 117.75C570.539 132.083 567.539 144.833 561.539 156C555.706 167.167 547.456 175.917 536.789 182.25C526.122 188.417 513.539 191.5 499.039 191.5ZM499.039 174.5C509.206 174.5 518.206 172.25 526.039 167.75C534.039 163.25 540.289 156.75 544.789 148.25C549.289 139.75 551.539 129.583 551.539 117.75C551.539 105.75 549.289 95.5 544.789 87C540.289 78.3333 534.039 71.75 526.039 67.25C518.206 62.75 509.206 60.5 499.039 60.5C488.872 60.5 479.789 62.75 471.789 67.25C463.956 71.75 457.789 78.3333 453.289 87C448.789 95.5 446.539 105.75 446.539 117.75C446.539 129.583 448.789 139.75 453.289 148.25C457.789 156.75 463.956 163.25 471.789 167.75C479.789 172.25 488.872 174.5 499.039 174.5Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-6" d="M587.248 12.5H605.998V187.5H587.248V12.5Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-7" d="M628.111 47.5H646.361V72C648.528 67.1667 651.611 62.5833 655.611 58.25C659.611 53.9167 664.778 50.4167 671.111 47.75C677.611 44.9167 685.361 43.5 694.361 43.5C703.361 43.5 711.445 45.3333 718.611 49C725.945 52.6667 731.695 58.75 735.861 67.25C740.028 75.5833 742.111 86.9167 742.111 101.25V187.5H723.861V104.5C723.861 94.8333 722.778 86.6667 720.611 80C718.445 73.3333 714.861 68.25 709.861 64.75C705.028 61.25 698.611 59.5 690.611 59.5C682.278 59.5 674.778 62 668.111 67C661.445 71.8333 656.111 78.5 652.111 87C648.278 95.5 646.361 105.333 646.361 116.5V187.5H628.111V47.5Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-8" d="M750.162 47.5H823.912V63H750.162V47.5ZM776.162 12.5H794.412V154.5C794.412 160.667 795.745 165.167 798.412 168C801.245 170.667 805.245 172 810.412 172H827.912V187.5H810.162C798.829 187.5 790.329 184.333 784.662 178C778.995 171.667 776.162 163.833 776.162 154.5V12.5Z" fill="currentColor"/>
      <path className="logo-letter logo-letter-9" d="M899.693 191.5C885.193 191.5 872.61 188.417 861.943 182.25C851.277 175.917 842.943 167.167 836.943 156C831.11 144.833 828.193 132.083 828.193 117.75C828.193 103.25 831.11 90.4167 836.943 79.25C842.943 68.0833 851.277 59.3333 861.943 53C872.61 46.6667 885.193 43.5 899.693 43.5C909.193 43.5 918.027 45.3333 926.193 49C934.36 52.5 941.36 57.75 947.193 64.75C953.193 71.5833 957.61 80 960.443 90C963.443 99.8333 964.527 111.083 963.693 123.75H838.693V107.25H957.693L946.943 116.25C946.943 105.25 945.027 95.5833 941.193 87.25C937.36 78.9167 931.943 72.4167 924.943 67.75C917.943 62.9167 909.527 60.5 899.693 60.5C888.693 60.5 879.277 63 871.443 68C863.61 72.8333 857.61 79.5833 853.443 88.25C849.277 96.75 847.193 106.583 847.193 117.75C847.193 128.75 849.277 138.583 853.443 147.25C857.61 155.75 863.61 162.417 871.443 167.25C879.277 172.083 888.693 174.5 899.693 174.5C912.527 174.5 922.443 171.5 929.443 165.5C936.443 159.333 941.277 151.917 943.943 143.25H963.193C960.86 152.917 956.86 161.333 951.193 168.5C945.527 175.667 938.36 181.333 929.693 185.5C921.027 189.5 911.027 191.5 899.693 191.5Z" fill="currentColor"/>
      
      <path className="logo-slash logo-slash-1" d="M1021.33 12.5H1056.83L1006.83 187.5H971.328L1021.33 12.5Z" fill="url(#slash-grad-1)"/>
      <path className="logo-slash logo-slash-2" d="M1105.61 12.5H1141.11L1091.11 187.5H1055.61L1105.61 12.5Z" fill="url(#slash-grad-2)"/>
      
      <path className="logo-i-stem" d="M1173.81 47.5H1192.06V187.5H1173.81V47.5Z" fill="currentColor"/>
      <path className="logo-i-dot" d="M1171.81 0H1194.06V23.25H1171.81V0Z" fill="currentColor"/>
    </svg>
  );
}
