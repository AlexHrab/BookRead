import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  selectInitialValue,
  selectInitialValuePlan,
  selectSum,
} from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";

import "chartjs-plugin-style";
import { useMediaQuery } from "react-responsive";

export function Schedule() {
  const InitialValue = useSelector(selectInitialValue);
  const InitialValuePlan = useSelector(selectInitialValuePlan);
  const Sum = useSelector(selectSum);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1150 });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: isTablet
      ? ["", "", "", "", "", ""]
      : isMobile
      ? ["", "", ""]
      : ["", "", "", "", "", "", ""],

    datasets: [
      {
        label: "ACT",
        data: isTablet
          ? [...InitialValue.slice(-6)]
          : isMobile
          ? [...InitialValue.slice(-3)]
          : [...InitialValue.slice(-7)],

        fill: false,
        borderColor: "rgb(9, 30, 63)",

        cubicInterpolationMode: "default",
        backgroundColor: ["rgba(9, 30, 63, 1)"],

        borderWidth: 2,
        lineTension: 0.4,
        pointLabel: {
          display: true,
        },
      },
      {
        label: "PLAN",
        data: isTablet
          ? [...InitialValuePlan.slice(-6)]
          : isMobile
          ? [...InitialValuePlan.slice(-3)]
          : [...InitialValuePlan.slice(-7)],

        fill: false,
        borderColor: "rgb(255, 107, 8)",

        backgroundColor: ["rgba(255, 107, 8, 1)"],
        borderWidth: 2,
        lineTension: 0.4,
        pointLabel: {
          display: true,
        },
      },
    ],
  };

  const customLegend = {
    id: "customLegend",
    afterDraw: (chart, args, options) => {
      const { _metasets, ctx } = chart;
      ctx.save();

      _metasets.forEach((meta) => {
        const { _dataset } = meta;
        const { borderColor, label } = _dataset;

        ctx.font = "600 12px Montserrat";
        ctx.fillStyle = borderColor;
        ctx.textBaseline = "middle";

        const lastDataPoint = meta.data[meta.data.length - 1];

        const legendWidth = 40;
        const legendHeight = 30;
        const legendX = lastDataPoint?.x + 5;
        const legendY = lastDataPoint?.y - legendHeight / 2;

        ctx.fillStyle = "#F5F7FA";
        ctx.shadowColor = "rgba(9, 30, 63, 0.10)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 3;

        ctx.fillRect(legendX, legendY, legendWidth, legendHeight);

        ctx.shadowColor = "rgba(0, 0, 0, 0)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        const textWidth = ctx.measureText(label).width;
        const textHeight = ctx.measureText("M").width;

        const textX = legendX + (legendWidth - textWidth) / 2;
        const textY =
          legendY + (legendHeight + textHeight) / 2 - textHeight / 2;

        ctx.fillStyle = "#091E3F";
        ctx.fillText(label, textX, textY);
      });

      ctx.restore();
    },
  };

  const Shadow = {
    id: "custom",
    afterDraw: (chart, args, options) => {
      const { _metasets, ctx } = chart;
      ctx.save();

      const originalStroke = ctx.stroke;

      ctx.stroke = function () {
        ctx.shadowColor = "#808080";
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;

        originalStroke.apply(this, arguments);
      };

      ctx.restore();
    },
  };

  const options = {
    layout: {
      padding: {
        right: 50,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",

        grid: {
          display: true,
          drawBorder: false,
          drawTicks: false,
        },
        title: {
          display: true,
          text: "TIME",
          font: {
            size: 12,
            weight: "400",
            family: "Montserrat",

            style: "normal",
          },
          color: "#242a37",
          align: "end",
          padding: {
            top: -15,
          },
        },
      },
      y: {
        type: "linear",
        display: true,

        min: -15,
        max: Sum + 20,
        grid: {
          display: false,
          drawBorder: true,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <Line
      options={options}
      data={data}
      style={{ width: "100%", height: "300px" }}
      plugins={[customLegend, Shadow]}
    />
  );
}
