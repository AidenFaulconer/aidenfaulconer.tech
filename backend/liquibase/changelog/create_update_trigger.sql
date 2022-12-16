
CREATE OR REPLACE FUNCTION on_updated_trigger() RETURNS TRIGGER AS 
$$
BEGIN
    new.updated_at := now();
    new.version := new.version + 1;
    return new;
END
$$ 
LANGUAGE plpgsql;