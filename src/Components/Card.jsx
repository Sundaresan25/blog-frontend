import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CardContainer(props) {
  const { data, key, onSelect } = props;

  return (
    <Card key={key} className="h-100" onClick={onSelect}>
      <CardContent className="cardContent">
        <CardHeader
          title={data.title}
          sx={{
            cursor: "pointer",
          }}
        />

        <CardMedia
          key={data.image}
          component="img"
          height="194"
          image={data.image}
          alt="Huawei P30"
        />

        <Typography
          variant="body2"
          color="text.secondary"
          className="cardDescription"
        >
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
