/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';

import AnimatedStroke from './AnimatedStroke';

const MARGIN = 10;
const vWidth = Dimensions.get('window').width + MARGIN;
const vHeight = Dimensions.get('window').height + MARGIN;
const width = Dimensions.get('window').width - 64;
const height = (width * vHeight) / vWidth;
const paths = [
  'M58.8341 124.894C58.8254 126.132 58.3201 127.317 57.4276 128.193C56.5352 129.069 55.3272 129.564 54.0651 129.573H44.6496C44.0365 129.586 43.4271 129.476 42.8592 129.249C42.2912 129.022 41.7768 128.683 41.3479 128.253C40.9015 127.813 40.5519 127.288 40.3206 126.71C40.0892 126.133 39.981 125.514 40.0027 124.894V88.0653C39.9814 87.445 40.0898 86.827 40.3211 86.2493C40.5525 85.6716 40.9019 85.1465 41.3479 84.7063C41.7772 84.2768 42.2916 83.9381 42.8595 83.7112C43.4274 83.4842 44.0366 83.3738 44.6496 83.3866H54.0651C55.3272 83.3952 56.5352 83.8909 57.4276 84.7664C58.3201 85.642 58.8254 86.8271 58.8341 88.0653V124.894Z',
  'M110.849 124.868C110.875 125.908 110.536 126.925 109.889 127.741C109.242 128.544 108.362 129.13 107.37 129.417C104.147 130.182 100.883 130.762 97.5933 131.154C94.4708 131.562 91.3263 131.782 88.1772 131.812C84.734 131.858 81.2957 131.537 77.9207 130.854C75.1008 130.262 72.4542 129.033 70.1836 127.262C66.5036 124.31 64.6637 120.439 64.6637 115.649V97.2104C64.6637 92.2621 66.5031 88.4308 70.1818 85.7163C71.9401 84.2796 74.4592 83.202 77.7392 82.4834C80.8588 81.6865 85.7375 81.2881 92.3752 81.2881V69.6726C92.3543 69.0535 92.4606 68.4367 92.6875 67.8601C92.9145 67.2836 93.2573 66.7595 93.6948 66.3202C94.1159 65.8914 94.6205 65.5534 95.1775 65.3269C95.7345 65.1003 96.3322 64.9901 96.9335 65.0031H106.17C106.791 64.9802 107.41 65.0853 107.988 65.3119C108.566 65.5385 109.091 65.8816 109.53 66.3199C109.969 66.7581 110.313 67.2821 110.54 67.859C110.767 68.4358 110.872 69.0533 110.849 69.6726V124.868ZM87.5768 90.3859C86.7344 90.3333 85.8963 90.5423 85.1777 90.9842C84.7489 91.2696 84.3838 91.6402 84.1052 92.0729C83.8265 92.5056 83.6403 92.991 83.5581 93.4988C83.2754 94.7157 83.1345 95.9612 83.1383 97.2104V115.649C83.1383 118.043 83.4581 119.799 84.0976 120.917C84.7372 122.034 85.9769 122.593 87.8169 122.593C89.3733 122.572 90.915 122.289 92.3765 121.754V91.2238C90.8321 90.6891 89.2114 90.4061 87.5768 90.3859V90.3859Z',
  'M163.317 124.865C163.343 125.906 163.004 126.923 162.357 127.74C161.71 128.543 160.83 129.129 159.838 129.416C156.615 130.182 153.351 130.762 150.061 131.154C146.938 131.562 143.793 131.782 140.644 131.812C137.2 131.858 133.762 131.537 130.387 130.854C127.567 130.261 124.92 129.032 122.65 127.261C118.97 124.308 117.131 120.435 117.131 115.643V88.0945C117.105 87.0539 117.444 86.0369 118.091 85.2201C118.739 84.4166 119.618 83.8311 120.61 83.5428C123.833 82.7771 127.097 82.1972 130.387 81.8061C133.51 81.3973 136.655 81.1774 139.804 81.1478C143.248 81.1019 146.687 81.423 150.062 82.1056C152.882 82.6998 155.528 83.9288 157.8 85.699C161.477 88.4145 163.317 92.2473 163.318 97.1975L163.317 124.865ZM136.565 120.912C137.204 122.032 138.444 122.591 140.284 122.589C141.841 122.569 143.382 122.285 144.844 121.751V97.1975C144.867 95.9104 144.746 94.6248 144.484 93.3644C144.38 92.8727 144.178 92.4071 143.889 91.9954C143.601 91.5838 143.232 91.2346 142.805 90.9689C142.403 90.5702 141.564 90.3707 140.286 90.3704C139.56 90.3798 138.836 90.4599 138.126 90.6096C137.326 90.7706 136.486 90.9702 135.607 91.2086V115.643C135.606 118.038 135.925 119.795 136.565 120.912V120.912Z',
  'M215.785 115.631C215.785 120.42 213.945 124.291 210.267 127.244C208.426 128.681 205.907 129.759 202.709 130.477C199.59 131.274 194.712 131.673 188.074 131.674V146.874C188.07 148.082 187.596 149.241 186.754 150.107C186.35 150.567 185.852 150.933 185.293 151.181C184.733 151.429 184.127 151.553 183.515 151.544H174.278C173.657 151.567 173.039 151.462 172.461 151.235C171.883 151.008 171.358 150.665 170.919 150.227C170.48 149.789 170.136 149.265 169.909 148.688C169.682 148.111 169.577 147.494 169.6 146.874V88.0932C169.573 87.053 169.912 86.0363 170.559 85.2199C171.207 84.4168 172.086 83.8315 173.078 83.5432C176.301 82.7773 179.566 82.1972 182.855 81.8059C185.978 81.3972 189.123 81.1774 192.273 81.1478C195.716 81.102 199.154 81.423 202.529 82.1052C205.349 82.699 207.995 83.9276 210.267 85.6973C213.944 88.4117 215.784 92.2431 215.785 97.1913V115.631ZM192.752 122.575C194.432 122.575 195.611 121.996 196.291 120.839C196.97 119.682 197.31 117.946 197.311 115.631V97.1927C197.333 95.9061 197.213 94.621 196.951 93.361C196.847 92.8695 196.645 92.404 196.356 91.9925C196.067 91.581 195.698 91.232 195.271 90.9665C194.87 90.5679 193.991 90.3685 192.633 90.3682C191.077 90.3895 189.536 90.6728 188.074 91.2061V121.737C189.578 122.266 191.157 122.548 192.752 122.575Z',
  'M268.251 124.998C268.251 127.072 267.201 128.546 265.102 129.422C263.89 129.739 262.538 130.038 261.045 130.318C259.551 130.599 258.037 130.858 256.502 131.096C254.967 131.334 253.453 131.513 251.96 131.634C250.466 131.755 249.114 131.814 247.902 131.812C243.888 131.854 239.878 131.574 235.91 130.975C232.747 130.512 229.75 129.279 227.189 127.388C223.474 124.44 221.617 120.574 221.617 115.79V79.0834C221.594 78.4649 221.701 77.8483 221.93 77.2722C222.159 76.6961 222.506 76.1728 222.95 75.7351C223.393 75.2975 223.923 74.9548 224.507 74.7285C225.09 74.5023 225.715 74.3973 226.342 74.4201H235.668C236.275 74.4076 236.879 74.5179 237.441 74.7441C238.004 74.9703 238.513 75.3076 238.938 75.7354C239.38 76.1744 239.726 76.6979 239.955 77.2736C240.184 77.8493 240.292 78.4652 240.271 79.0834V83.6282H254.2C254.827 83.6054 255.452 83.7104 256.035 83.9366C256.619 84.1629 257.149 84.5056 257.592 84.9433C258.036 85.3809 258.383 85.9042 258.612 86.4803C258.841 87.0564 258.948 87.673 258.924 88.2916C258.937 88.8907 258.826 89.4861 258.597 90.0411C258.368 90.596 258.026 91.0988 257.592 91.5184C257.148 91.9545 256.618 92.2961 256.034 92.5223C255.451 92.7485 254.827 92.8545 254.201 92.8337H240.271V115.791C240.221 116.983 240.448 118.17 240.937 119.261C241.252 119.992 241.779 120.616 242.451 121.054C243.742 122.091 245.478 122.609 247.659 122.609C250.03 122.624 252.399 122.464 254.746 122.13C256.884 121.813 259.448 121.295 262.437 120.576C263.012 120.416 263.613 120.37 264.206 120.442C264.799 120.514 265.371 120.702 265.889 120.995C266.414 121.272 266.874 121.654 267.239 122.117C267.605 122.581 267.867 123.115 268.011 123.685C268.171 124.481 268.251 124.919 268.251 124.998Z',
  'M290.487 115.725C290.438 116.921 290.665 118.112 291.153 119.207C291.469 119.941 291.995 120.568 292.667 121.008C293.957 122.049 295.692 122.569 297.873 122.569C300.244 122.584 302.611 122.423 304.957 122.088C307.095 121.769 309.657 121.249 312.646 120.528C313.529 120.203 314.503 120.224 315.37 120.588C316.099 120.919 316.741 121.412 317.247 122.029C317.694 122.564 318.042 123.174 318.276 123.829C318.448 124.184 318.511 124.58 318.456 124.97C318.488 125.742 318.312 126.508 317.947 127.191C317.582 127.873 317.04 128.447 316.378 128.854C315.84 129.193 315.248 129.44 314.628 129.585C313.596 129.84 312.471 130.083 311.252 130.312C309.757 130.592 308.243 130.852 306.711 131.093C305.179 131.334 303.665 131.514 302.171 131.633C300.676 131.752 299.324 131.812 298.115 131.812C294.103 131.854 290.094 131.573 286.127 130.972C282.965 130.507 279.969 129.269 277.41 127.37C273.696 124.41 271.84 120.528 271.84 115.724V88.1112C271.813 87.068 272.156 86.0485 272.809 85.2299C273.463 84.4243 274.35 83.8373 275.352 83.5486C278.605 82.781 281.899 82.1997 285.22 81.8077C288.372 81.3979 291.546 81.1775 294.725 81.1478C298.2 81.1019 301.67 81.4237 305.077 82.1079C307.922 82.7032 310.594 83.9352 312.886 85.71C316.599 88.4319 318.456 92.2739 318.456 97.2359C318.456 102.279 316.6 106.161 312.886 108.882C311.11 110.244 308.568 111.364 305.261 112.243C301.95 112.964 297.026 113.324 290.489 113.324L290.487 115.725ZM295.331 104.199C296.181 104.252 297.027 104.042 297.752 103.599C298.558 103.119 299.102 102.258 299.386 101.018C299.669 99.7767 299.811 98.5082 299.811 97.2359C299.833 95.9457 299.711 94.6571 299.447 93.3936C299.342 92.9007 299.138 92.4339 298.847 92.0212C298.555 91.6086 298.183 91.2586 297.752 90.9924C297.347 90.5927 296.46 90.3928 295.09 90.3925C293.519 90.4139 291.963 90.698 290.487 91.2327V103.357C292.045 103.895 293.681 104.179 295.331 104.199V104.199Z',
  'M366.264 92.6518C365.9 92.6787 365.534 92.6381 365.185 92.5321C362.545 91.8933 360.026 91.3739 357.627 90.9737C356.402 90.77 355.187 90.6183 353.983 90.5186C352.012 90.3715 350.03 90.4917 348.092 90.8759C347.906 90.9107 347.726 90.9441 347.55 90.9759C346.751 91.1035 345.993 91.411 345.331 91.875C344.686 92.3729 344.189 93.0356 343.891 93.7929C343.478 94.886 343.255 96.0411 343.231 97.2089V124.896C343.227 126.105 342.754 127.265 341.911 128.132C341.508 128.592 341.009 128.959 340.45 129.207C339.891 129.456 339.284 129.58 338.672 129.571H329.435C328.815 129.594 328.196 129.489 327.618 129.262C327.04 129.035 326.515 128.691 326.076 128.253C325.637 127.814 325.293 127.289 325.066 126.712C324.839 126.134 324.734 125.516 324.756 124.896V97.2067C324.756 92.253 326.596 88.4175 330.275 85.7001C332.593 83.9433 335.513 82.7446 339.032 82.1041C342.915 81.4348 346.85 81.114 350.79 81.1456C354.494 81.1633 358.189 81.5244 361.826 82.2243C362.625 82.3851 363.504 82.5847 364.464 82.8232C365.424 83.0617 366.543 83.3415 367.822 83.6625C369.901 84.5424 370.941 85.9806 370.942 87.9771C370.942 88.058 370.861 88.4979 370.702 89.2956C370.143 91.5336 368.663 92.6524 366.264 92.6518Z',
  'M58.0287 77.3658C58.013 77.7806 57.8518 78.1769 57.5731 78.4859C57.2944 78.7898 56.9283 79.0008 56.5248 79.0904C55.2182 79.3142 53.8999 79.4631 52.5762 79.5365C51.3186 79.6212 50.0571 79.6302 48.7984 79.5637C47.4219 79.496 46.0566 79.2825 44.7256 78.9267C43.6142 78.6205 42.588 78.0653 41.7254 77.3038C40.33 76.0382 39.8991 71.1829 40.0193 69.2763L40.117 67.727C40.1321 67.3118 40.2932 66.9151 40.5721 66.6059C40.8512 66.3027 41.2172 66.092 41.6205 66.0024C42.927 65.7783 44.2454 65.6294 45.5691 65.5563C46.8266 65.4712 48.0882 65.462 49.3468 65.5286C50.7233 65.5959 52.0886 65.809 53.4196 66.1643C54.5309 66.4712 55.557 67.0264 56.4198 67.7876C57.8206 68.96 58.2533 73.7992 58.1291 75.7692L58.0287 77.3658Z',
  'M283.116 138.543C281.489 138.543 280.024 139.528 279.41 141.035L271.902 159.493C270.832 162.123 272.768 165 275.608 165H345.446C347.073 165 348.538 164.014 349.152 162.507L356.66 144.05C357.73 141.419 355.794 138.543 352.954 138.543H283.116ZM288.232 157.888C288.317 157.963 288.413 158 288.52 158H295.88C295.997 158 296.093 157.963 296.168 157.888C296.243 157.803 296.28 157.707 296.28 157.6V156C296.28 155.883 296.243 155.787 296.168 155.712C296.093 155.627 295.997 155.584 295.88 155.584H291.032V147.2C291.032 147.083 290.995 146.987 290.92 146.912C290.845 146.837 290.749 146.8 290.632 146.8H288.52C288.413 146.8 288.317 146.837 288.232 146.912C288.157 146.987 288.12 147.083 288.12 147.2V157.6C288.12 157.707 288.157 157.803 288.232 157.888ZM299.987 157.904C300.062 157.968 300.142 158 300.227 158H302.195C302.462 158 302.638 157.888 302.723 157.664L303.331 156.032H307.603L308.227 157.664C308.312 157.888 308.483 158 308.739 158H310.707C310.803 158 310.883 157.968 310.947 157.904C311.022 157.829 311.059 157.749 311.059 157.664L311.027 157.52L307.283 147.248C307.251 147.12 307.182 147.013 307.075 146.928C306.968 146.843 306.83 146.8 306.659 146.8H304.291C304.12 146.8 303.982 146.843 303.875 146.928C303.768 147.013 303.699 147.12 303.667 147.248L299.907 157.52C299.896 157.552 299.891 157.6 299.891 157.664C299.891 157.749 299.923 157.829 299.987 157.904ZM305.475 149.504L306.963 153.728H303.987L305.475 149.504ZM315.632 157.888C315.717 157.963 315.813 158 315.92 158H320.944C322.245 158 323.248 157.701 323.952 157.104C324.656 156.507 325.008 155.675 325.008 154.608C325.008 154.053 324.859 153.552 324.56 153.104C324.261 152.656 323.893 152.331 323.456 152.128C323.797 151.957 324.101 151.691 324.368 151.328C324.645 150.955 324.784 150.501 324.784 149.968C324.784 148.955 324.453 148.176 323.792 147.632C323.141 147.077 322.144 146.8 320.8 146.8H315.92C315.813 146.8 315.717 146.837 315.632 146.912C315.557 146.987 315.52 147.083 315.52 147.2V157.6C315.52 157.707 315.557 157.803 315.632 157.888ZM321.456 150.928C321.232 151.141 320.907 151.248 320.48 151.248H318.4V148.88H320.48C320.907 148.88 321.232 148.987 321.456 149.2C321.68 149.413 321.792 149.696 321.792 150.048C321.792 150.411 321.68 150.704 321.456 150.928ZM321.648 155.536C321.403 155.792 321.061 155.92 320.624 155.92H318.4V153.28H320.624C321.061 153.28 321.403 153.408 321.648 153.664C321.893 153.909 322.016 154.224 322.016 154.608C322.016 154.971 321.893 155.28 321.648 155.536ZM331.554 157.712C332.279 158.011 333.148 158.16 334.162 158.16C335.1 158.16 335.932 158.021 336.658 157.744C337.394 157.456 337.964 157.051 338.37 156.528C338.786 155.995 338.994 155.371 338.994 154.656C338.994 154.005 338.855 153.467 338.578 153.04C338.3 152.603 337.863 152.251 337.266 151.984C336.679 151.707 335.89 151.477 334.898 151.296C334.29 151.168 333.82 151.045 333.49 150.928C333.17 150.8 332.935 150.661 332.786 150.512C332.647 150.363 332.578 150.176 332.578 149.952C332.578 149.621 332.706 149.371 332.962 149.2C333.218 149.029 333.586 148.944 334.066 148.944C334.482 148.944 334.828 149.029 335.106 149.2C335.394 149.371 335.57 149.579 335.634 149.824C335.698 149.92 335.767 149.989 335.842 150.032C335.927 150.075 336.034 150.096 336.162 150.096H338.274C338.37 150.096 338.45 150.064 338.514 150C338.578 149.936 338.61 149.856 338.61 149.76C338.588 149.291 338.396 148.816 338.034 148.336C337.682 147.845 337.164 147.44 336.482 147.12C335.799 146.8 334.994 146.64 334.066 146.64C333.17 146.64 332.386 146.784 331.714 147.072C331.042 147.36 330.524 147.76 330.162 148.272C329.799 148.784 329.618 149.365 329.618 150.016C329.618 150.976 329.932 151.717 330.562 152.24C331.202 152.752 332.162 153.141 333.442 153.408C334.135 153.557 334.658 153.691 335.01 153.808C335.362 153.925 335.618 154.059 335.778 154.208C335.948 154.357 336.034 154.549 336.034 154.784C336.034 155.115 335.874 155.376 335.554 155.568C335.234 155.76 334.77 155.856 334.162 155.856C333.65 155.856 333.239 155.765 332.93 155.584C332.62 155.403 332.396 155.173 332.258 154.896C332.172 154.8 332.087 154.731 332.002 154.688C331.927 154.635 331.826 154.608 331.698 154.608H329.682C329.586 154.608 329.5 154.645 329.426 154.72C329.362 154.784 329.33 154.859 329.33 154.944C329.351 155.52 329.543 156.053 329.906 156.544C330.279 157.024 330.828 157.413 331.554 157.712Z',
];

const StrokeAnimation = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 4000,
      easing: Easing.linear,
    });
  }, [progress]);
  return (
    <Svg
      width={width}
      height={height}
      viewBox={[0, 0, vWidth + MARGIN / 2, vHeight + MARGIN / 2].join(' ')}>
      {paths.map((d, key) => (
        <AnimatedStroke progress={progress} d={d} key={key} />
      ))}
    </Svg>
  );
};

export default StrokeAnimation;
