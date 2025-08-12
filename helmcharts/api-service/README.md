# API Service Helm Chart

This Helm chart deploys the API service microservice to Kubernetes.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- PostgreSQL database (can be deployed separately or use existing)

## Installation

### Quick Start

```bash
# Add the repository (if using a chart repository)
helm repo add your-repo https://your-chart-repo.com

# Install the chart
helm install api-service ./helmcharts/api-service
```

### With Custom Values

```bash
# Create a custom values file
cat > my-values.yaml << EOF
image:
  repository: your-registry/api-service
  tag: "v1.0.0"

database:
  host: "postgres-service"
  password: "your-secure-password"

ingress:
  enabled: true
  hosts:
    - host: api.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
EOF

# Install with custom values
helm install api-service ./helmcharts/api-service -f my-values.yaml
```

## Configuration

The following table lists the configurable parameters of the api-service chart and their default values.

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `1` |
| `image.repository` | Container image repository | `your-registry/api-service` |
| `image.tag` | Container image tag | `latest` |
| `image.pullPolicy` | Container image pull policy | `IfNotPresent` |
| `service.type` | Kubernetes service type | `ClusterIP` |
| `service.port` | Kubernetes service port | `3000` |
| `ingress.enabled` | Enable ingress | `false` |
| `ingress.className` | Ingress class name | `""` |
| `ingress.hosts` | Ingress hosts configuration | `[{host: api-service.local, paths: [{path: /, pathType: ImplementationSpecific}]}]` |
| `resources.limits.cpu` | CPU resource limits | `500m` |
| `resources.limits.memory` | Memory resource limits | `512Mi` |
| `resources.requests.cpu` | CPU resource requests | `250m` |
| `resources.requests.memory` | Memory resource requests | `256Mi` |
| `autoscaling.enabled` | Enable horizontal pod autoscaling | `false` |
| `autoscaling.minReplicas` | Minimum replicas for HPA | `1` |
| `autoscaling.maxReplicas` | Maximum replicas for HPA | `100` |
| `autoscaling.targetCPUUtilizationPercentage` | Target CPU utilization for HPA | `80` |
| `autoscaling.targetMemoryUtilizationPercentage` | Target memory utilization for HPA | `80` |
| `database.host` | Database host | `postgres-service` |
| `database.port` | Database port | `5432` |
| `database.name` | Database name | `postgres` |
| `database.user` | Database user | `postgres` |
| `database.password` | Database password | `postgres` |
| `database.existingSecret` | Existing secret for database password | `""` |
| `database.existingSecretKey` | Key in existing secret for password | `password` |
| `config.port` | Application port | `3000` |
| `config.cors.enabled` | Enable CORS | `true` |
| `config.cors.origin` | CORS origin | `"*"` |
| `config.logging.level` | Logging level | `info` |
| `config.logging.sql` | Enable SQL logging | `false` |
| `livenessProbe.httpGet.path` | Liveness probe path | `/health` |
| `readinessProbe.httpGet.path` | Readiness probe path | `/health` |

## Database Configuration

The application requires a PostgreSQL database. You can either:

1. **Use an existing database**: Set the `database.host`, `database.port`, `database.name`, `database.user`, and `database.password` values.

2. **Use an existing secret**: Set `database.existingSecret` to the name of an existing Kubernetes secret containing the database password.

3. **Deploy PostgreSQL separately**: Use a PostgreSQL Helm chart or operator.

### Example with PostgreSQL Helm Chart

```bash
# Install PostgreSQL
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql

# Get the PostgreSQL password
export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)

# Install API service with PostgreSQL configuration
helm install api-service ./helmcharts/api-service \
  --set database.host=postgres-postgresql.default.svc.cluster.local \
  --set database.password=$POSTGRES_PASSWORD
```

## Health Checks

The application includes a `/health` endpoint that returns a 200 status code and JSON response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

This endpoint is used by Kubernetes liveness and readiness probes.

## API Endpoints

The service exposes the following REST API endpoints:

- `POST /records` - Create a new record
- `GET /records/:id` - Get a record by ID
- `GET /records` - Get records with optional filtering

## Scaling

### Manual Scaling

```bash
kubectl scale deployment api-service --replicas=3
```

### Automatic Scaling

Enable horizontal pod autoscaling:

```bash
helm upgrade api-service ./helmcharts/api-service \
  --set autoscaling.enabled=true \
  --set autoscaling.minReplicas=2 \
  --set autoscaling.maxReplicas=10
```

## Monitoring

The application exposes metrics and health information that can be scraped by Prometheus and displayed in Grafana.

## Troubleshooting

### Check Pod Status

```bash
kubectl get pods -l app.kubernetes.io/name=api-service
```

### View Logs

```bash
kubectl logs -f deployment/api-service
```

### Check Service

```bash
kubectl get svc api-service
```

### Port Forward for Local Access

```bash
kubectl port-forward svc/api-service 8080:3000
```

Then access the API at `http://localhost:8080`.

## Uninstalling

```bash
helm uninstall api-service
```

## Contributing

When making changes to this chart:

1. Update the version in `Chart.yaml`
2. Test the chart with `helm template`
3. Validate the generated YAML
4. Update this README if needed 