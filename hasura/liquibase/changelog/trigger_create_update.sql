CREATE OR REPLACE TRIGGER trigger_on_updated_trigger
BEFORE UPDATE ON actor
FOR EACH ROW EXECUTE PROCEDURE on_updated_trigger_ref()